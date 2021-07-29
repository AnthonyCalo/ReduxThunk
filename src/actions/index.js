import jsonPlaceholder from "../apis/jsonPlaceholder"
import _ from 'lodash';
//thunk is required as middle ware because we are returning a function from action

//combining these makes it simpler
//now the postList no longer has to make fetchUser calls
export const fetchPostsAndUsers=()=> async (dispatch, getState)=>{
    await dispatch(fetchPosts());
    console.log(getState());
    //this line gets each unique userid from all posts.
    const userIds = _.uniq(_.map(getState().posts, 'userId'));
    //rather than making network requests fro every post. just 
    userIds.forEach(id=> dispatch(fetchUser(id)));
}
export const fetchPosts=()=>{
    //defined a function fetchPosts that returns a function. OK because of thunk middleware
    return async function(dispatch){    
            const response = await jsonPlaceholder.get('/posts');

            dispatch({
                type: "FETCH_POSTS",
                payload: response.data
            })
        }
    }

// different way of doing it. Simpler doesn't require return statement like fetchPosts
export const fetchUser =(id)=> async dispatch=>{

//defining this outside the regular fetchUser function so that memoize works
    const response = await jsonPlaceholder.get(`/users/${id}`);

    dispatch({
        type: "FETCH_USER",
        payload: response.data
    })
}; 

// other way with memoize to reduce apic alls for users when they repeat
// export const fetchUser =(id)=> dispatch=>_fetchUser(id, dispatch);

// //defining this outside the regular fetchUser function so that memoize works
// const _fetchUser =_.memoize(async (id, dispatch)=>{
//     const response = await jsonPlaceholder.get(`/users/${id}`);

//     dispatch({
//         type: "FETCH_USER",
//         payload: response.data
//     })
// }); 


