<!-- <template>
	<div>
		<img src="./assets/logo.png" alt="logo">

		//通过父组件给子组件传递函数类型的props实现：子给父传递数据
		<MySchool :getSchoolName='getSchoolName'></MySchool>

		//通过父组件给子组件绑定一个自定义事件实现：子给父传递数据(第一种写法，使用@或v-on)
		<MyStudent v-on:atguigu='getStudentName' @demo='m1'></MyStudent>

		//通过父组件给子组件绑定一个自定义事件实现：子给父传递数据(第二种写法，使用ref)
		<MyStudent ref='student @click.native='show'/>
	</div>
</template>

<script>
	//引入组件
	import MySchool from './components/MySchool.vue'
	import MyStudent from './components/MyStudent.vue'

	export default {
		name:'App',
		components:{
			MySchool,
			MyStudent
		},
		methods:{
			getSchoolName(name){
				console.log('App收到了学校名：'，name)
			},
			getStudentName(name,...params){
				console.log('App收到了学生名：'，name,params)
			},
			m1(){
				console.log('')
			},
			show(){
				alter(123)
			}
		},
		mounted(){
			setTimeout(()=>{
				this.$refs.student.$on('atguigu',this.getStudentName)//绑定自定义事件
				this.$refs.student.$once('atguigu',this.getStudentName)//绑定自定义事件一次性
			},3000)
			
		}

	}
</script> -->
<template>
	<div id="root">
		<div class="todo-container">
			<div class="todo-wrap">
				<MyHeader :addTodo="addTodo"/>
				<MyList :todos="todos" :checkTodo="checkTodo" :deleteTodo="deleteTodo"/>
				<MyFooter :todos="todos" :checkAllTodo="checkAllTodo" :clearAllTodo="clearAllTodo"/>
			</div>
		</div>
	</div>
</template>

<script>
	import MyHeader from './components/MyHeader'
	import MyList from './components/MyList'
	import MyFooter from './components/MyFooter.vue'

	export default {
		name:'App',
		components:{MyHeader,MyList,MyFooter},
		data() {
			return {
				//由于todos是MyHeader组件和MyFooter组件都在使用，所以放在App中（状态提升）
				// todos:[
				// 	{id:'001',title:'学前端',done:true},
				// 	{id:'002',title:'学后端',done:true},
				// 	{id:'003',title:'学全栈',done:true}
				// ],
				
				//本地缓存
				todos:JSON.parse(localStorage.getItem('todos')) ||[]
			}
		},
		methods: {
			//添加一个todo
			addTodo(todoObj){
				this.todos.unshift(todoObj)
			},
			//勾选or取消勾选一个todo
			checkTodo(id){
				this.todos.forEach((todo)=>{
					if(todo.id === id) todo.done = !todo.done
				})
			},
			//删除一个todo
			deleteTodo(id){
				this.todos = this.todos.filter( todo => todo.id !== id )
			},
			//全选or取消全选
			checkAllTodo(done){
				this.todos.forEach((todo)=>{
					todo.done = done
				})
			},
			//更新title
			updateTodo(id,title){
				this.todos.forEach((todo)=>{
					if(todo.id === id) todo.title = title
				})
			},
			//清除所有已经完成的todo
			clearAllTodo(){
				this.todos = this.todos.filter((todo)=>{
					return !todo.done
				})
			}
		},
		watch:{
			todos:{
				deep:true,
				handler(value){
					localStorage.setItem('todos',JSON.stringify(value))
				}
			}
		},
		mounted(){
			this.$bus.$on('updateTodo',this.updateTodo)
		},
		beforeDestroy(){
			this.$bus.$off('updateTodo')
		}
	}
</script>

<style>
	/*base*/
	body {
		background: #fff;
	}
	.btn {
		display: inline-block;
		padding: 4px 12px;
		margin-bottom: 0;
		font-size: 14px;
		line-height: 20px;
		text-align: center;
		vertical-align: middle;
		cursor: pointer;
		box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
		border-radius: 4px;
	}
	.btn-danger {
		color: #fff;
		background-color: #da4f49;
		border: 1px solid #bd362f;
	}
	.btn-edit {
		color: #fff;
		background-color: #5898f2;
		border: 1px solid #6990e2;
	}
	.btn-danger:hover {
		color: #fff;
		background-color: #bd362f;
	}
	.btn:focus {
		outline: none;
	}
	.todo-container {
		width: 600px;
		margin: 0 auto;
	}
	.todo-container .todo-wrap {
		padding: 10px;
		border: 1px solid #ddd;
		border-radius: 5px;
	}
</style>
