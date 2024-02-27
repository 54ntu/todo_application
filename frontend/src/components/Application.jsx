import React, {useState,useEffect}  from 'react'
import {useForm} from 'react-hook-form'
import {toast} from 'react-hot-toast'
import axios from 'axios'
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";


const Application = () => {

  const [formData, setFormdata] = useState([])
  const [editTodo,setEditTodo] = useState(null)


  const form = useForm({
    defaultValues:{
      notedetail:"",
      is_completed:false
    }
  })


  //todo display section starts here

  const getData = async ()=>{
    try{

      const {data} = await axios.get('http://127.0.0.1:8000/api/home')
      // form.setValue('notedetail',response.notedetail || '');
      // form.setValue('is_completed',response.is_completed || '');
      setFormdata(data);
      
      
    }
    catch(error){
      console.error('error fetching data : ', error);
    }
  }

 useEffect(()=>{
  getData();
 },[])



  //todo add section starts here 

  const addNote =async (values)=>{
    console.log(values)
   
    try{
        if(!editTodo){
           const response = await axios.post('http://127.0.0.1:8000/api/home',{ notedetail:values.notedetail, is_completed:values.is_completed})
            if (response.status ==200){
              toast.success('todo added successfully');
              //update formdata state with the newly added todos
              setFormdata([...formData,response.data]); // here we are assuming that response.data contains newly added todos
              form.reset();
            }
            else{
              toast.error('something went wrong');
            }
        }else{
          console.log('edittodo.id value is : ', editTodo);
          const response = await axios.put(`http://127.0.0.1:8000/api/update/${editTodo.id}`,values);
          if (response.status==200){
            toast.success('todo updated successfully')
            setFormdata(formData.map(todo=>todo.id==editTodo.id?{...todo,notedetail:values.notedetail}:todo))
            setEditTodo( null);
            form.reset();
          
          }else{
            toast.error("something went wrong");
          }
        }
     
    }catch(error){
      console.error('error adding  or updating todos : ',error);
      toast.error('  something went wrong');
    }
    }
    

  // todo add section ends here


  //todo delete section starts here

const deleteNote = async(id)=>{
 
  try{
    const response = await axios.delete(`http://127.0.0.1:8000/api/update/${id}`);
    if (response.status==200){
      toast.success('todo deleted successfully');
      setFormdata(formData.filter((todo) => todo.id !== id));
    }else{
      toast.error('something went wrong');
    }

  }catch(error){
    console.error('something went wrong', error);
    toast.error('something went wrong');
  }
}


//edit function
const handleEdit= (todo)=>{
  console.log('todo value is : ', todo);
  setEditTodo(todo) //setting the todo values for setEdit
  form.setValue('notedetail',todo.notedetail); // setting the notedetail value for input field
  
}


//function for checkbox toggling
const handelToggleChange = async(id, isCompleted, tododetail)=>{
  try{
    const response = await axios.put(`http://127.0.0.1:8000/api/update/${id}`,{notedetail:tododetail, is_completed: !isCompleted});
    if (response.status ===200){
      setFormdata(formData.map(todo=>todo.id ==id ?{...todo,is_completed :!isCompleted}: todo));
      toast.success('status changed')
    }else{
      toast.error('error on status updation');
    }

  }catch(error){
    console.log('something went wrong', error);
    toast.error('something went wrong');
  }
}



  return (
    <div className='container mx-auto my-6 rounded-xl p-5 bg-violet-100  min-h-[70vh] w-1/4'>
        {/* todo add section starts here  */}
          <div className='addtodos my-5  text-center'>
            <form onSubmit={form.handleSubmit(addNote)}>
              {editTodo? <h2 className='text-xl mb-4 font-bold underline underline-offset-3' >Update Task</h2>:<h2 className='text-xl mb-4 font-bold underline underline-offset-3' >Add Task</h2>}
              <input placeholder='enter your todo' className=' rounded-md   p-1 text-lg' {...form.register("notedetail")} ></input>
              <button className='bg-violet-800 text-white  p-3 py-1 rounded-md mx-3 m-4' type='submit'>{editTodo?'update':'Add'}</button>
            </form>
          </div>
        {/* todo add section ends here  */}


      {/* todos show section  starts here */}

       <hr className='h-1 bg-white'></hr>
          <div className='text-center mt-5'>
              <h2 className='text-lg font-bold mb-5 underline underline-offset-3 '>Your todos</h2>

            {
              formData?.map((todo,index)=>{
                
                return(
                    
                      <div className='todos flex justify-between' key={index} >
                        
                        <div className='flex gap-8'>
                          
                                <div>
                                  <input type='checkbox' checked={todo.is_completed}  onChange={()=>handelToggleChange(todo.id,todo.is_completed, todo.notedetail)}  ></input>
                                
                                </div>
                                <div className={`todotext mb-3 ${todo.is_completed ? 'line-through':''}`} > {todo?.notedetail}</div>

                        </div>
                        
                                <div className='button'>
                                  <button className='bg-violet-800 text-white  text-sm p-2 py-1 rounded-md ' onClick={()=>handleEdit(todo)} ><FaRegEdit /></button>
                                  <button className='bg-violet-800 text-white text-sm p-2 py-1 mx-1 rounded-md ' type='submit'onClick={()=>deleteNote(todo.id)} > <MdDeleteForever /></button>
                                </div>
                      </div> 
                               
                );
              })
            }
             
          </div>
        {/* todos show section ends here  */}
    </div>
  )
}

export default Application

