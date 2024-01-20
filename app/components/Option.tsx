interface Option {
  id: number;
  name: string;
  imgSrc: string;
}

export const OptionComponent = ({
  option,
  onClick,
}: {
  option: Option;
  onClick: () => void;
}) => (
  <p key={option.id} onClick={onClick} className="cursor-pointer p-3 border-b ">
    <span className="flex gap-10">
      <img src={option.imgSrc} alt={option.name} />
      <p>{option.name}</p>
    </span>
  </p>
);
