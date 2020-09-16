<template>
    <div v-cloak>
      <div style="margin-bottom: 20px;">
        <el-button
          size="small"
          @click="addTab(editableTabsValue)"
        >
          添加
        </el-button>
      </div>
      <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" @tab-click="tabClick">
        <el-tab-pane
          v-for="(item, index) in editableTabs"
          :key="item.name"
          :label="item.title"
          :name="item.name">
          {{item.content}}
        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
    export default {
      name: "Menu",
      data() {
        return {
          editableTabsValue: '2',
          editableTabs: [
            {
              title: '选项1',
              name: '1',
            },
            {
              title: '选项2',
              name: '2',
              content: '内容2'
            },
            {
              title: '选项3',
              name: '3',
            }
          ],
          tabIndex : 3
        }
      },
      methods: {
        addTab(targetName) {
          let newTabName = ++this.tabIndex + '';
          this.editableTabs.push({
            title: '新标签',
            name: newTabName,
            content: '标签内容'
          });
          this.editableTabsValue = newTabName;
        },
        removeTab(targetName) {
          console.info('关闭');
          let tabs = this.editableTabs;
          let activeName = this.editableTabsValue;
          if (activeName === targetName) {
            tabs.forEach((tab, index) => {
              if (tab.name === targetName) {
                let nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                  activeName = nextTab.name;
                }
              }
            });
          }
          this.editableTabsValue = activeName;
          this.editableTabs = tabs.filter(tab => tab.name !== targetName);
        },
        tabClick : function(targetName){
          console.info(targetName);
          console.info('点击选中');
        },
      }
    }
</script>

<style scoped>

</style>