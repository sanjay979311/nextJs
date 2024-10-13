// 'use client'
// import React from 'react'
// import type { RootState } from '../../../redux/store'
// import { useSelector, useDispatch } from 'react-redux'
// import { decrement, increment } from '../../../redux/features/counterSlice'
// // npm uninstall next@canary --f
// const Edit  = () =>{

//     const count = useSelector((state: RootState) => state.counter.value)
//     const dispatch = useDispatch()

//     return(
//         <>
//        <div>
//       <div>
//         <button
//           aria-label="Increment value"
//           onClick={() => dispatch(increment())}
//         >
//           Increment
//         </button>
//         <span>{count}</span>
//         <button
//           aria-label="Decrement value"
//           onClick={() => dispatch(decrement())}
//         >
//           Decrement
//         </button>
//       </div>
//     </div>
//         </>
//     )
// }

// export default Edit

'use client'
import React from 'react'
import type { RootState } from '../../../redux/store'

const Edit  = () =>{

 
        return(
          <>
          <h1> edit</h1>
          </>
        )
    
}

export default Edit