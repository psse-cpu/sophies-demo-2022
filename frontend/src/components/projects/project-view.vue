<template>
  <div class="project q-pa-md">
    <div class="row">
      <div
        id="sprint-length"
        data-testid="sprint-length"
        class="col-md-1 col-xs-2"
      >
        <q-tooltip anchor="bottom middle" self="top middle">
          Sprint length (coming soon: project logo goes here)
        </q-tooltip>
        <div class="text-h4 text-center">
          <q-icon name="mdi-calendar-refresh" style="font-size: 0.7em" />
          {{ props.project.sprintLength }}
        </div>
        <div class="row text-center flex-center">
          week{{ props.project.sprintLength === 1 ? '' : 's' }}
        </div>
      </div>
      <div class="col-md-7 col-xs-10">
        <h4 class="title" data-testid="project-name">
          {{ props.project.name }}
        </h4>
      </div>
      <p
        class="col-md-4 col-xs-12 q-pt-md text-grey-7"
        data-testid="project-description"
      >
        {{ props.project.description }}
      </p>
    </div>

    <q-separator spaced />

    <div class="shadow-1 q-pa-md" style="height: 150px">
      TODO: some overview / dashboard goes here
    </div>

    <div class="row">
      <div id="members" class="col-md-8 col-xs-12">
        <h5 class="members-title text-primary">
          <q-icon name="mdi-account-group" />
          <span class="q-ml-md">Members:</span>
        </h5>

        <div class="row q-mb-md">
          <q-select
            class="col-8"
            rounded
            outlined
            clearable
            v-model="newMember"
            :options="options"
            stack-label
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
                @click="addAsRole(ScrumRole.PRODUCT_OWNER)"
              >
                <q-item-section>
                  <q-item-label>Add as Scrum Master</q-item-label>
                </q-item-section>
              </q-item>

              <q-item
                clickable
                v-close-popup
                @click="addAsRole(ScrumRole.SCRUM_MASTER)"
              >
                <q-item-section>
                  <q-item-label>Add as Product Owner</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>

        <q-table
          data-testid="members-table"
          hide-pagination
          :rows="rows"
          :columns="columns"
          row-key="name"
        >
          <template v-slot:body-cell-member="props">
            <q-td :props="props">
              <q-avatar text-color="white" :color="randomColor()">
                {{ props.row.member.givenName[0] }}
              </q-avatar>
              {{
                props.row.member.familyName + ', ' + props.row.member.givenName
              }}
            </q-td>
          </template>
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn flat round color="negative" icon="mdi-account-remove" />
            </q-td>
          </template>
        </q-table>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Project, ScrumRole } from 'src/generated/graphql'
import { sample } from 'lodash'
import { ref } from 'vue'

interface ProjectViewProps {
  project: Pick<
    Project,
    'id' | 'name' | 'description' | 'sprintLength' | 'createdAt' | 'memberships'
  >
}

const props = defineProps<ProjectViewProps>()

const columns = [
  { name: 'member', label: 'Member', field: 'member', align: 'left' as const },
  { name: 'role', label: 'Role', field: 'scrumRole', align: 'left' as const },
  { name: 'actions', label: 'Remove', field: 'id', align: 'center' as const },
]

const newMember = ref(null) // eslint-disable-line unicorn/no-null -- annoying

const addAsRole = (_scrumRole: ScrumRole) => {
  /* pass */
}

const options = [
  { label: 'Richard Michael Coo', value: 1, extra: 'foo@bar.ph' },
  { label: 'Huhu', value: 2, extra: 'baz@quux.com' },
]

const rows = props.project.memberships.map(({ id, user, scrumRole }) => ({
  member: user,
  scrumRole,
  id,
}))

const randomColor = () =>
  sample(['red', 'pink', 'purple', 'indigo', 'teal', 'amber', 'brown'])
</script>

<style lang="scss" scoped>
.title {
  color: $primary;
  margin: 0px;
  margin-bottom: 6px;
  margin-top: 8px;
  padding-left: 16px;
}

#sprint-length {
  width: 80px;
  color: lighten($secondary, 10%);
  background-color: $grey-2;
  border-radius: 16px;
  padding: 4px;
}

.members-title {
  margin: 32px 8px 16px;
}
</style>
