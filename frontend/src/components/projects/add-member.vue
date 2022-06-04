<template>
  <div class="row q-mb-md">
    <q-select
      class="col-8"
      rounded
      outlined
      clearable
      input-debounce="500"
      use-input
      v-model="newMember"
      :options="options"
      stack-label
      @filter="searchUsers"
      label="Add Member"
      color="secondary"
    >
      <template v-slot:selected-item="scope">
        <div>
          <q-avatar size="sm" :color="randomColor()" text-color="white">
            {{ scope.opt.label[0] }}
          </q-avatar>
          <span class="q-ml-sm">{{ scope.opt.label }}</span>
        </div>
      </template>

      <template v-slot:option="scope">
        <q-item v-bind="scope.itemProps">
          <q-item-section avatar>
            <q-avatar :color="randomColor()" text-color="white">
              {{ scope.opt.label[0] }}
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ scope.opt.label }}</q-item-label>
            <q-item-label caption>{{ scope.opt.extra }}</q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </q-select>
    <q-btn-dropdown
      split
      icon="mdi-account-plus"
      color="primary"
      rounded
      size="md"
      @click="addAsRole(ScrumRole.MEMBER)"
      style="height: 48px; align-self: center; margin-left: 16px"
      :label="$q.screen.gt.md ? 'Add as Member' : ''"
    >
      <q-list>
        <q-item
          clickable
          v-close-popup
          @click="addAsRole(ScrumRole.SCRUM_MASTER)"
        >
          <q-item-section>
            <q-item-label>Add as Scrum Master</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          clickable
          v-close-popup
          @click="addAsRole(ScrumRole.PRODUCT_OWNER)"
        >
          <q-item-section>
            <q-item-label>Add as Product Owner</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { Membership, ScrumRole, User } from 'src/generated/graphql'
import { ref } from 'vue'
import { sample } from 'lodash'
import { useMutation, useQuery } from '@urql/vue'
import { SearchUsersDocument } from './search-users.generated'
import { AddMemberDocument } from './add-member.generated'

export type Member = Pick<Membership, 'id' | 'scrumRole'> & {
  user: Pick<User, 'email' | 'familyName' | 'givenName' | 'id'>
}

interface AddMemberProps {
  projectId: number
}

interface DropdownOptions {
  label: string
  value: number
  extra: string
}

interface AddMemberEmits {
  (event: 'memberAdded', members: Member[]): void
}

const props = defineProps<AddMemberProps>()
const emit = defineEmits<AddMemberEmits>()

const keyword = ref('')

const {
  data: searchResults,
  error: _searchError,
  fetching: _searchIsLoading,
  executeQuery,
} = useQuery({
  query: SearchUsersDocument,
  variables: { keyword: keyword as unknown as string },
  pause: true,
})

const newMember = ref<DropdownOptions | undefined>()

const { executeMutation } = useMutation(AddMemberDocument)

const addAsRole = async (scrumRole: ScrumRole) => {
  if (newMember.value) {
    const { data } = await executeMutation({
      membershipInput: {
        userId: newMember.value.value, // value from ref, then value from dropdown
        projectId: props.projectId,
        scrumRole,
      },
    })

    if (data?.members) {
      emit('memberAdded', data.members)
    }
  }
}

const options = ref<DropdownOptions[]>([])

const searchUsers = (
  selectFieldEntry: string,
  update: (callback: () => void) => void,
  abort: () => void
) => {
  if (selectFieldEntry.length < 2) {
    abort()
  } else {
    keyword.value = selectFieldEntry
    executeQuery({ requestPolicy: 'network-only' }).then((_) =>
      update(() => {
        options.value =
          searchResults.value?.users.map((user) => ({
            label: `${user.familyName}, ${user.givenName}`,
            value: user.id,
            extra: user.email,
          })) ?? []
      })
    )
  }
}

// TODO: temporary placeholder for profile pictures
const randomColor = () =>
  sample(['red', 'pink', 'purple', 'indigo', 'teal', 'amber', 'brown'])
</script>
