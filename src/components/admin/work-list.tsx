import React from 'react';
import { Link } from 'react-router-dom';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Chip } from '@heroui/react';
import { Icon } from '@iconify/react';
import { Work } from '../../types/work';

interface WorkListProps {
  works: Work[];
  onDelete: (id: string) => void;
}

const WorkList: React.FC<WorkListProps> = ({ works, onDelete }) => {
  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'graphic-design': return 'Графический дизайн';
      case 'websites': return 'Сайты';
      case 'apps': return 'Приложения';
      case 'presentations': return 'Презентации';
      default: return category;
    }
  };
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'graphic-design': return 'primary';
      case 'websites': return 'success';
      case 'apps': return 'warning';
      case 'presentations': return 'secondary';
      default: return 'default';
    }
  };
  
  return (
    <Table 
      aria-label="Список работ"
      removeWrapper
      className="glass-effect rounded-lg"
    >
      <TableHeader>
        <TableColumn>НАЗВАНИЕ</TableColumn>
        <TableColumn>КАТЕГОРИЯ</TableColumn>
        <TableColumn>ДАТА</TableColumn>
        <TableColumn>ДЕЙСТВИЯ</TableColumn>
      </TableHeader>
      <TableBody emptyContent="Нет доступных работ">
        {works.map((work) => (
          <TableRow key={work.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded overflow-hidden">
                  <img 
                    src={work.imageUrl} 
                    alt={work.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="font-medium text-white">{work.title}</div>
              </div>
            </TableCell>
            <TableCell>
              <Chip
                color={getCategoryColor(work.category) as any}
                variant="flat"
                size="sm"
              >
                {getCategoryLabel(work.category)}
              </Chip>
            </TableCell>
            <TableCell>
              <span className="text-white/70">{work.date}</span>
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button
                  as={Link}
                  to={`/admin/work/edit/${work.id}`}
                  isIconOnly
                  size="sm"
                  variant="light"
                  color="primary"
                >
                  <Icon icon="lucide:edit" />
                </Button>
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  color="danger"
                  onPress={() => onDelete(work.id)}
                >
                  <Icon icon="lucide:trash" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default WorkList;