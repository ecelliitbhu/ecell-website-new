import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    name: "John Doe",
    collegeName: "IIT BHU",
    collegeYear: "2024",
    phone: "123-456-7890",
    points: 1200,
    tasks: [
      { id: 1, title: "Get the startupjunction form filled by at least 10 people", completed: true, lastDate: "2024-10-10" },
      { id: 2, title: "Task 2", completed: false, lastDate: "2024-10-05" },
      { id: 3, title: "Task 3", completed: false, lastDate: "2024-10-08" },
    ],
    referrals:{},
  },
  leaderboard: [
    { name: "Alice", points: 1500 },
    { name: "Bob", points: 1400 },
    { name: "John Doe", points: 1200 },
  ],
  leaderboardLoading:true,
  taskLoading:true,
  userLoading:true,
  referralCodes:{
    "comp1": "DUMMY_REFERRAL",
    "comp2": "DUMMY_REFERRAL",
    "comp3": "DUMMY_REFERRAL",
    "comp4": "DUMMY_REFERRAL",
  }
};

const campusAmbassadorSlice = createSlice({
  name: 'campusAmbassador',
  initialState,
  reducers: {
    updateUser(state, action) {
      state.user = action.payload;
      state.referralCodes=JSON.parse(state.user.referrals);
    },
    addTask(state, action) {
      state.user.tasks=(action.payload);
    },
    updateTask(state, action) {
      const { id, updates } = action.payload;  
      const taskIndex = state.user.tasks.findIndex(task => task.id === id);
      if (taskIndex !== -1) {
        const updatedTask = { 
          ...state.user.tasks[taskIndex],  
          ...updates,  
        };
        state.user.tasks[taskIndex] = updatedTask;
      }
    },
    updateLeaderboard(state, action) {
      state.leaderboard = action.payload;
    },
    updateUserLoading(state,action){
      state.userLoading=action.payload
    },
    updateTaskLoading(state,action){
      state.taskLoading=action.payload
    },
    updateLeaderboardLoading(state,action){
      state.leaderboardLoading=action.payload
    }
  },
});

export const { updateUser, addTask, updateTask,updateLeaderboard,updateLeaderboardLoading,updateTaskLoading,updateUserLoading } = campusAmbassadorSlice.actions;

export default campusAmbassadorSlice.reducer;
