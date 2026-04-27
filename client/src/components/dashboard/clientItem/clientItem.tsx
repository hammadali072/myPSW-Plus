import React from 'react';

interface ClientItemProps {
  name: string;
  type: string;
  image: string;
  visits: number;
}

const ClientItem: React.FC<ClientItemProps> = ({ name, type, image, visits }) => {
  return (
    <div className="flex items-center justify-between py-4 border-b border-[#e2daf5] last:border-0 hover:bg-gray-50/50 duration-300 cursor-pointer group px-2">
      <div className="flex items-center gap-4">
        <div className="size-12 rounded-full overflow-hidden border-2 border-primary/5 shadow-sm">
          <img src={image} alt={name} className="size-full object-cover group-hover:scale-110 duration-500" />
        </div>
        <div>
          <h5 className="text-[15px] font-bold text-gray-900 font-playfair leading-tight">{name}</h5>
          <p className="text-[13px] text-gray-400 font-medium font-dm mt-0.5">{type}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-[15px] font-bold text-gray-900 font-dm">{visits}</p>
        <p className="text-[11px] text-gray-400 font-black uppercase tracking-widest">visits</p>
      </div>
    </div>
  );
};

export default ClientItem;
