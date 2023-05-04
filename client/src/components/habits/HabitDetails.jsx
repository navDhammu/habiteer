import { IconArrowLeft, IconListDetails, IconPointer } from '@tabler/icons-react';
import clsx from 'clsx';
import Heading from 'components/ui/Heading';
import IconButton from 'components/ui/IconButton';
import { useLocation, useNavigate } from 'react-router-dom';
import EmptyState from '../EmptyState';

export default function HabitDetails({ habit }) {
   const navigate = useNavigate();
   const { pathname } = useLocation();

   return (
      <section
         className={clsx(
            !habit && 'hidden',
            'overflow-y-scroll p-4 md:relative md:block md:h-auto md:w-auto md:grow'
         )}
      >
         {!habit ? (
            <div className="abs-center text-center">
               <IconPointer className="mx-auto" />
               Click habit details to see more information
            </div>
         ) : (
            <>
               <IconButton
                  className="md:hidden"
                  onClick={() =>
                     navigate(pathname.slice(0, pathname.lastIndexOf('/')))
                  }
                  Icon={IconArrowLeft}
               />
               <Heading>{habit.habitName}</Heading>
               <p className="text-gray-500">{habit.habitDescription}</p>
               <div className="flex h-full items-center justify-center">
                  <EmptyState
                     icon={<IconListDetails />}
                     text="Additional habit details go here"
                  />
               </div>
            </>
         )}
      </section>
   );
}
