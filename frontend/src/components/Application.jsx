import React from 'react'

const Application = () => {
  return (
    <div className='container mx-auto my-6 rounded-xl p-5 bg-violet-100  min-h-[70vh] w-1/4'>
        <div className='addtodos my-5  text-center'>

         <h2 className='text-xl mb-4 font-bold underline underline-offset-3'>Add a todo</h2>

         <input placeholder='enter your todo' className=' rounded-md   p-1 text-lg' ></input>
         <button className='bg-violet-800 text-white  p-3 py-1 rounded-md mx-3'>Add</button>

        </div>
       <hr className='h-1 bg-white'></hr>
        <div className='text-center mt-5'>
            <h2 className='text-lg font-bold mb-5 underline underline-offset-3 '>Your todos</h2>
            <div className='todos flex justify-between'>
                <div><input type='checkbox'></input></div>
                <div className='todotext line-through'>text</div>
                <div className='button'>
                    <button className='bg-violet-800 text-white  text-sm p-2 py-1 rounded-md '>Edit
</button>
                    <button className='bg-violet-800 text-white text-sm p-2 py-1 mx-1 rounded-md '> delete</button>

                </div>
            </div>
        </div>
    </div>
  )
}

export default Application





