import React, {useState,useEffect}  from 'react'
import {useForm} from 'react-hook-form'
import {toast} from 'react-hot-toast'
import axios from 'axios'

const Application = () => {

  const [formData, setFormdata] = useState([])

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
      console.log('data we are getting: ', data);
      // form.setValue('notedetail',response.notedetail || '');
      // form.setValue('is_completed',response.is_completed || '');
      setFormdata(data);
      console.log("formData : ",formData);
      
      
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
    try{

      console.log("values we are getting : ", values)
      const response = await axios.post('http://127.0.0.1:8000/api/home',values)
      if (response.status ==200){
        toast.success('note added successfully');
        //update formdata state with the newly added todos
        setFormdata([...formData,response.data]); // here we are assuming that response.data contains newly added todos
  
      }
      else{
        toast.error('something went wrong');
      }
    }catch(error){
      console.error('error adding todos : ',error);
      toast.error('  something went wrong');
    }
    }
    

  // todo add section ends here





  return (
    <div className='container mx-auto my-6 rounded-xl p-5 bg-violet-100  min-h-[70vh] w-1/4'>


        {/* todo add section starts here  */}
          <div className='addtodos my-5  text-center'>
            <form onSubmit={form.handleSubmit(addNote)}>
              <h2 className='text-xl mb-4 font-bold underline underline-offset-3'>Add a todo</h2>
              <input placeholder='enter your todo' className=' rounded-md   p-1 text-lg' {...form.register("notedetail")} ></input>
              <button className='bg-violet-800 text-white  p-3 py-1 rounded-md mx-3 m-4' type='submit'>Add</button>
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
                  
                    <div className='todos flex justify-between' key={index}>
                        <div><input type='checkbox'></input></div>
                        <div className='todotext line-through mb-3 ' > {todo?.notedetail}</div>
                        <div className='button'>
                          <button className='bg-violet-800 text-white  text-sm p-2 py-1 rounded-md ' >Edit</button>
                          <button className='bg-violet-800 text-white text-sm p-2 py-1 mx-1 rounded-md '> delete</button>

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





