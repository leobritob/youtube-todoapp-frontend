import { Column } from 'components';
import { ListItem, ListItemProps } from './ListItem';

type ListProps = {
  items: ListItemProps[];
};

export const List: React.FC<ListProps> = ({ items }) => {
  return (
    <Column py="10px">
      {items.map((item, index) => (
        <ListItem key={index} {...item} />
      ))}
    </Column>
  );
};
