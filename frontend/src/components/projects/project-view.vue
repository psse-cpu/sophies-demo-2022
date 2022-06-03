<template>
  <div class="project q-pa-md">
    <div class="row">
      <div id="sprint-length" class="col-md-1 col-xs-2">
        <q-tooltip anchor="bottom middle" self="top middle">
          Sprint length (coming soon: project logo goes here)
        </q-tooltip>
        <div data-testid="sprint-length" class="text-h4 text-center">
          <q-icon name="mdi-calendar-refresh" style="font-size: 0.7em" />
          {{ props.project.sprintLength }}
        </div>
        <div class="row text-center flex-center">weeks</div>
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
          <q-icon name="mdi-account-group" /><span class="q-ml-md"
            >Members:</span
          >
        </h5>

        <q-table
          hide-pagination
          :grid="$q?.screen.xs ?? false"
          :rows="rows"
          :columns="columns"
          row-key="name"
        >
          <template v-slot:body-cell-member="props">
            <q-td :props="props">
              <q-avatar text-color="white" :color="randomColor()">{{
                props.row.member.givenName[0]
              }}</q-avatar>
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
import { Project } from 'src/generated/graphql'
import { sample } from 'lodash'

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
