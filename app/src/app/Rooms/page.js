'use client'

import { NavBar } from '../componets/Nav';
import { Pagination } from '../componets/Pagination';
import { List } from '../componets/List';
import { EnterInRoomForm } from '../componets/Forms/EnterInRoomForm';

export default function Home() {
  return (
    <header className="bg-white">
      <NavBar/>
      <section className='container mx-auto flex'>
          <div className='w-1/2 flex justify-center'>
            <EnterInRoomForm/>
          </div>
          <div className='w-1/2'>
            <List/>
            <Pagination/>
          </div>
      </section>
    </header>
  )
}