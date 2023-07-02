
import classNames from 'classnames';

/* Reusable "Panel" component design:
  1. Create a new component that shows a handful of JSX elements
  2. Make sure the component accepts + uses the "children" prop
  3. Allow extra classNames to be passed in + merge them (className prop)
  4. Take extra props (like event handler functions, in ...rest), pass them through to root element
*/

function Panel({children, className, ...rest}){
    const finalClassNames = classNames('border rounded p-3 shadow bg-white w-full',
                        className);
    
    return (
        <div {...rest} className={finalClassNames}>
            {children}
        </div>
    )
}


export default Panel;