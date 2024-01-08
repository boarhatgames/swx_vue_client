<template>
    <v-list-item
      :prepend-avatar="user.$state.defaultAvatar.thumbUrl"
      :title="user.$state.firstName + space + user.$state.lastName"
    ></v-list-item>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        prepend-icon="mdi-view-dashboard"
        title="Profile"
        value="profile"
        to="/profile"
      ></v-list-item>

      <!-- <v-list-item prepend-icon="mdi-gavel" title="Admin"></v-list-item> -->
      <v-list-group value="toggles">
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-tune-variant"
            title="Toggles"
            value="home"
          ></v-list-item>
        </template>
        <v-list-item value="pet">
          <template v-slot:prepend="{ petActiv }">
            <v-list-item-action start>
              <v-switch
                color="info"
                :model-value="petActive"
                @change="switchToggle('updateTakePet')"
              ></v-switch>
            </v-list-item-action>
          </template>

          <v-list-item-title>Take Pet</v-list-item-title>

          <v-list-item-subtitle> In-World </v-list-item-subtitle>
        </v-list-item>
        <v-list-item value="header">
          <template v-slot:prepend="{ headerActiv }">
            <v-list-item-action start>
              <v-switch
                color="info"
                :model-value="headerActive"
                @change="switchToggle('header')"
              ></v-switch>
            </v-list-item-action>
          </template>

          <v-list-item-title>SW Header</v-list-item-title>
        </v-list-item>
        <v-list-item value="experiment">
          <template v-slot:prepend="{ experActiv }">
            <v-list-item-action start>
              <v-switch
                color="info"
                :model-value="experActive"
                @change="switchToggle('experiment')"
              ></v-switch>
            </v-list-item-action>
          </template>

          <v-list-item-title>Experimental</v-list-item-title>

          <v-list-item-subtitle> No PHP </v-list-item-subtitle>
        </v-list-item>
      </v-list-group>
      <v-list-group value="settings">
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-account-cog"
            title="Settings"
            value="home"
          ></v-list-item>
        </template>
        <v-list-item title="View Items Wearing" value="itemsWorn" />
        <v-list-item to="settings" title="Account" value="account" />
      </v-list-group>
      <v-list-group value="admin" v-if="isAdmin || hasInviteControl">
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-gavel"
            title="Admin"
            value="home"
          ></v-list-item>
        </template>
        <!-- @click = new window -->
        <v-list-item title="SMI" value="SMI" v-if="isAdmin" @click="smi" />
        <v-list-item
          title="Upload"
          value="upload"
          v-if="isAdmin"
          @click="
            triggerDialog({
              url: 'https://smallworlds.app/upload',
              width: '800px',
              height: '750px',
            })
          "
        />
        <v-list-item
          title="Invite"
          value="invite"
          v-if="hasInviteControl || isSuperAdmin"
          @click="
            triggerDialog({
              url: 'https://smallworlds.app/add/invite',
              width: '500px',
              height: '500px',
            })
          "
        />
        <v-list-item
          title="Config Strings"
          value="config"
          v-if="isAdmin"
          @click="
            triggerDialog({
              url: 'https://smallworlds.app/conf',
              width: '800px',
              height: '750px',
            })
          "
        />
        <v-list-item title="Database" value="database" v-if="isSuperAdmin" />

        <v-list-group value="items" v-if="hasWebsiteControl">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              title="Item Functions"
              value="itemFunc"
            ></v-list-item>
          </template>
          <v-list-item
            title="Fix Items"
            value="fix"
            @click="
              triggerDialog({
                url: 'https://smallworlds.app/fix/items',
                width: '800px',
                height: '750px',
              })
            "
          />
          <v-list-item
            title="Add Items"
            value="add"
            @click="
              triggerDialog({
                url: 'https://smallworlds.app/add/item/model',
                width: '800px',
                height: '750px',
              })
            "
          />
          <v-list-item
            title="All Items"
            value="all"
            @click="
              triggerDialog({
                url: 'https://smallworlds.app/all/items',
                width: '950px',
                height: '750px',
              })
            "
          />
          <v-list-item
            title="Missing Items"
            value="missing"
            @click="
              triggerDialog({
                url: 'https://smallworlds.app/missing/items',
                width: '950px',
                height: '750px',
              })
            "
          />
        </v-list-group>
      </v-list-group>
    </v-list>
</template>

<script>
export default {
  name: 'profileHeader',
  props: {
    user: {
      type: Object,
      required: true,
    },
    petActive: {
      type: Boolean,
      required: true,
    },
    headerActive: {
      type: Boolean,
      required: true,
    },
    experActive: {
      type: Boolean,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
    },
    hasInviteControl: {
      type: Boolean,
      required: true,
    },
    hasWebsiteControl: {
      type: Boolean,
      required: true,
    },
    hasRemember: {
      type: Boolean,
      required: true,
    },
    isSuperAdmin: {
      type: Boolean,
      required: true,
    },

  },
  data: () => ({
    space: ' ',
  }),
  emits: ['triggerDialog', 'smi', 'switchToggle', 'getCurrentRoutes'],
  methods : {
    triggerDialog(payload) {
      this.$emit('triggerDialog', payload);
    },
    smi() {
      this.$emit('smi');
    },
    switchToggle(payload) {
      this.$emit('switchToggle', payload);
    },
   
    getCurrentRoutes() {
      this.$emit('getCurrentRoutes');
    },
  },
}
</script>