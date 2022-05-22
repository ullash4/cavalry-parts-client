import React from 'react'

function ReviewCard({rev}) {
    const {name, company, review, picture} = rev;
  return (
    
    <div class="max-w-md px-8 py-4 mx-auto mt-16 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <div class="flex justify-center -mt-16 md:justify-end">
            <img class="object-cover w-20 h-20 border-2 border-blue-500 rounded-full dark:border-blue-400" alt="Testimonial avatar" src={picture} />
        </div>

        <h2 class="mt-2 text-2xl font-semibold text-gray-800 dark:text-white md:mt-0 md:text-3xl">{company}</h2>

        <p class="mt-2 text-gray-600 dark:text-gray-200">{review}</p>
        
        <div class="flex justify-end mt-4">
            <a href="g" class="text-xl font-medium text-blue-500 dark:text-blue-300">{name}</a>
        </div>
    </div>
  )
}

export default ReviewCard