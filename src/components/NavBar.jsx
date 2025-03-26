import logo from '../assets/HomeyLogo.png'
import bell from '../assets/Bell.png'
import user from '../assets/User-Circle.png'
export const NavBar = ({ parent }) => {
    return (
        <div className='navbar '>

            <div className='flex  gap-8 '>
                <img src={logo} className='max-h-10' />
                <div className='flex items-center gap-4'>
                    <nav >My To Do</nav>
                    <nav >Shared View</nav>
                    <nav >Analytics</nav>
                </div>
            </div>
            <div className='flex items-center gap-2 mx-4'>
            <img src={bell} className='max-h-10' />
            <img src={user} className='max-h-10' />

            </div>

        </div>
    )
}