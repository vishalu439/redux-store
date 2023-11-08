import { createSlice } from '@reduxjs/toolkit'


export const cartSlice=createSlice({
 name:"cart",
 initialState:[],
 reducers:{
    add(state,action){
      return [...state,action.payload]
    },
    remove(state,action){
      return state.filter((i)=>i.id!==action.payload)
    }

 },




})
export const { add,remove} = cartSlice.actions;
export default cartSlice.reducer
