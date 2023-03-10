<template>
	<div class="demo">
		<h2>学校名称：{{ name }}</h2>
		<h2>学校地址：{{ address }}</h2>
		<button @click="showName">点我提示学校名</button>
		<button @click="sendSchoolName">把学校名给App</button>
	</div>
</template>

<script>
export default {
	name: 'MySchool',
	props:['sendSchoolName'],
	data() {
		return {
			name: '尚硅谷',
			address: '北京昌平'
		}
	},
	methods: {
		showName() {
			alert(this.name)
		},
		sendSchoolName(){
			this.getSchoolName(this.name)
		}
	},
	
	//挂载
	mounted() {
		this.$bus.$on('send',(name)=>{
			console.log("我是School组件,我已收到学生姓名:",name)
		})
	},
	beforeDestroy(){
		this,$bus.$off('send')
	}
}
</script>

<style>
.demo {
	background-color: orange;
}
</style>