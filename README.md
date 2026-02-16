# Todo-list

This project is a simple todo-list, built as an attempt to practice ***React*** and ***Typescript***.
Visit the implementation here: https://todo-list-vz2n.onrender.com/

<div align='center'>
    <img src="/demo/demo.png" width="67.4%">
    <img src="/demo/demo-mobile.png" width="21%">
</div>

<div align='center'>
    <img src="/demo/demo-light.png" width="67.4%">
    <img src="/demo/demo-light-mobile.png" width="21%">
</div>


## Features
It features the following interactive elements:
- Adding a todo item to the list 
    - The data is saved in the local storage for persistence

- Marking or unmarking a todo item as completed 
    - By clicking on the circular button on the left hand side

- Unmarking all completed todo items 
    - By clicking on the 'Clear Completed' button at the bottom right corner

- Deleting a todo item from the list 
    - By clicking on the x button on the right hand side
    
- Showing either all, completed or still active to do item only 
    - By clicking on the button at the center bottom panel

- Toggle between light or dark mode 
    - By clicking on the sun at the top right, with the preference being saved into local storage for persistence as well

- Drag and drop to reorder the list 
    - If the item is dropped with the cursor pointing at the top half of another item, it will be placed before that item.
    - If the item is dropped with the cursor pointing at the bottom half of another item, it will be placed afterwards that item.



## Key takeaways
1. Challenges in implementing drag and drop features.
- The basic implementation of the drag and drop feature for reordering in this implementation can largely be completed by referring to: https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API
- However, in this implementation, I faced the following issues:
    - Each of the item row is stacked together with the `absolute` positioned drop zone
    - As a result, the drop zone is preventing the cursor from accessing the elements that are stacked beneath it, namely the button for marking/unmarking (O) and deleting (X).
- Event bubbling and capturing are not applicable as a solution in this case as the drop zone and the item rows are not in parent-child relationship.
- Therefore, the solution is as following:
    - By default, set all the drop zone to have this CSS attribute `pointer-events: none`
    - Therefore, these drop zones despite stacked on top of the item row will neve be the target of any pointer events. This therefore, allow the cursor to access the bottom elements with pointer-events, namely `onClick` events for the O and X.
    - When `onDragStart` event is fired (indicating that an element is being dragged), override that CSS attribute with `pointer-events: auto`.
    - With this, now the drop zone takes precedence over the O and X features and can serve properly as a drop zone.
    - This solution works as when an item is dropped, O and X are not accessible anyway.
    - When `onDragEnd` event is fired (indicating that the dragged element is released), that  CSS attribute with `pointer-events: auto` is removed, making the drop zone div as dormant again.

2. Difference between `event.target` and `event.currentTarget`
    - Broadly speaking, `event.target` refers to the HTML element that triggers this event.
    - Meanwhile, `event.currentTarget` refers to the element that is being attached with the event listener.
    - For simple event such as `onClick`, they generally refer to the same thing. But in the case of `onDragStart` and `onDragEnd`, we need to use `event.currentTarget` to access the element that is being dragged.

3. Return a destructured Array of Object in a `stateSetter` function in React
    - When using the `stateSetter` function of a state that is an Array of Object, I wanted to modify the some of the objects in it.
    - Initially, I destructure the array to create a new instance (i.e. [...Arr]) and then proceed to modify the objects in it.
    - However, I have then realised that this method only create a new instance of that array, but not the object elements in it.
    - Therefore, as I am modifying those elments, I am modifying the object elements of the previous state.
    - In strict mode, where the `stateSetter` function is run twice, this will lead to the same object elements being modified twice and is not desirable. This has affected the purity of the function.
    - Therefore, it is advised to use `.map` function when working on the a state that is an Array of Object to ensure both array and object instances are new instances.

