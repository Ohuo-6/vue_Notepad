<template>
	<div>
		<h2>学生姓名：{{ name }}</h2>
		<h2>学生年龄：{{ age }}</h2>
		<button @click="sendStudentName">把学生名给App</button>
		<button @click="unbind">解绑atguigu事件</button>
		<button @click="death">销毁当前Student组件的实例</button>
		<button @click="sendStudentName1">把学生名给School</button>
	</div>
</template>

<script>
export default {
	name: 'MyStudent',
	data() {
		return {
			name: '张三',
			age: 18
		}
	},
	methods: {
		sendStudentName(){
			//触发Student组件实例身上的atguigu事件
			this.$emit('atguigu',this.name)
			// this.$emit('demo',this.name)
		},
		unbind(){
			this.$off('atguigu')//解绑一个自定义事件
			// this.$off(['atguigu','demo'])//解绑多个个自定义事件
			// this.$off()//解绑所有自定义事件
		},
		death(){
			this.$destroy()//销毁了当前Student组件的实例，销毁后所有Student实例自定义事件全都不奏效
		},
		sendStudentName1(){
			this.$bus.$emit('send',this.name)
		}
	},
}
</script>
