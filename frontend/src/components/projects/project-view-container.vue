<template>
  <project-view :project="project" />
</template>

<script lang="ts" setup>
import { Membership, ScrumRole } from 'src/generated/graphql'
import ProjectView from './project-view.vue'

const project = {
  id: 1,
  name: 'hehe',
  description: 'hehehehehe',
  sprintLength: 2,
  memberships: [
    {
      id: 1,
      user: { givenName: 'Mike', familyName: 'Choi' },
      scrumRole: ScrumRole.PRODUCT_OWNER,
    },
    {
      id: 2,
      user: { givenName: 'Hyeon Moo', familyName: 'Park' },
      scrumRole: ScrumRole.MEMBER,
    },
  ] as Membership[],
  createdAt: new Date(),
}
</script>
