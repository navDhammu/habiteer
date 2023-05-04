import { IconArrowRight, IconEdit, IconTag, IconTrash } from '@tabler/icons-react';
import { NavLink } from 'react-router-dom';
import Card from '../ui/Card';
import IconButton from '../ui/IconButton';

export default function HabitCard(props) {
   return (
      <Card as="article" className="py-3 px-5">
         <header>
            <h1 className="font-semibold text-slate-700 first-letter:capitalize">
               {props.habitName}
            </h1>
         </header>
         <span className="flex items-center gap-1 text-sm text-gray-400">
            <IconTag className="w-4" />
            {props.habitCategory}
         </span>
         <i className="text-sm first-letter:capitalize">
            {props.habitDescription}
         </i>
         <hr className="my-2" />
         <footer className="flex items-center justify-between">
            <div>
               <IconButton size="sm" Icon={IconEdit} />
               <IconButton size="sm" Icon={IconTrash} />
            </div>
            <NavLink
               to={`/all-habits/${props.id}`}
               className="font flex items-center text-sm text-indigo-500"
            >
               Details
               <IconArrowRight className="ml-2 w-4" />
            </NavLink>
         </footer>
      </Card>
   );
}
