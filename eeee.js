import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import { combineReducers } from 'redux'



//todo 晚上开搞store发起 Actions的例子




const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO'
const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'


const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}
const { SHOW_ALL } = VisibilityFilters
/*
 * action 创建函数
 */

function addTodo(text) {
  return { type: ADD_TODO, text }
}

function toggleTodo(index) {
  return { type: TOGGLE_TODO, index }
}

function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter }
}






function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case TOGGLE_TODO:
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: !todo.completed
          })
        }
        return todo
      })
    default:
      return state
  }
}

const todoApp = combineReducers({
  visibilityFilter,
  todos
})


let store = createStore(todoApp, window.STATE_FROM_SERVER)

// 打印初始状态
console.log(store.getState())

// 每次 state 更新时，打印日志
// 注意 subscribe() 返回一个函数用来注销监听器
const unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)

// 发起一系列 action
store.dispatch(addTodo('Learn about actions'))
store.dispatch(addTodo('Learn about reducers'))
store.dispatch(addTodo('Learn about store'))
store.dispatch(toggleTodo(0))
store.dispatch(toggleTodo(1))
store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED))

// 停止监听 state 更新
unsubscribe();






/*
{visibilityFilter: "SHOW_ALL", todos: Array(0)}todos: []visibilityFilter: "SHOW_ALL"__proto__: Object
index.js:95 {visibilityFilter: "SHOW_ALL", todos: Array(1)}todos: Array(1)0: {text: "Learn about actions", completed: false}length: 1__proto__: Array(0)visibilityFilter: "SHOW_ALL"__proto__: Object
index.js:95 {visibilityFilter: "SHOW_ALL", todos: Array(2)}todos: Array(2)0: {text: "Learn about actions", completed: false}1: {text: "Learn about reducers", completed: false}length: 2__proto__: Array(0)visibilityFilter: "SHOW_ALL"__proto__: Object
index.js:95 {visibilityFilter: "SHOW_ALL", todos: Array(3)}todos: Array(3)0: {text: "Learn about actions", completed: false}1: {text: "Learn about reducers", completed: false}2: {text: "Learn about store", completed: false}length: 3__proto__: Array(0)visibilityFilter: "SHOW_ALL"__proto__: Object
index.js:95 {visibilityFilter: "SHOW_ALL", todos: Array(3)}todos: Array(3)0: {text: "Learn about actions", completed: true}1: {text: "Learn about reducers", completed: false}2: {text: "Learn about store", completed: false}length: 3__proto__: Array(0)visibilityFilter: "SHOW_ALL"__proto__: Object
index.js:95 {visibilityFilter: "SHOW_ALL", todos: Array(3)}
index.js:95 {visibilityFilter: "SHOW_COMPLETED", todos: Array(3)}
*/










