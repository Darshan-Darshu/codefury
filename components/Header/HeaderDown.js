const Dummy_data = [
  { data: "Web Development" },
  { data: "Business" },
  { data: "Finance & Accounting" },
  { data: "IT & Accounting" },
  { data: "Office Productivity" },
  { data: "Personal Development" },
  { data: "Design" },
  { data: "Marketing" },
  { data: "Health & Fitness" },
  { data: "Music" },
];

function HeaderDown() {
  return (
    <div className='hidden lg:flex h-12 items-center bg-purple-800 text-white shadow-md'>
      <ul className='flex items-center space-x-8 max-w-[1300px] mx-auto'>
        {Dummy_data.map((data) => (
          <li
            className='text-sm font-semibold'
            key={data.data}
          >
            {data.data}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HeaderDown;
