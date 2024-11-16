import { useEffect } from 'react'; // React Imports
import { useForm, Controller } from 'react-hook-form'; // MUI Imports
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import CustomTextField from '@core/components/mui/TextField';
import { CategoryDocumentsField } from '@/types/apps/categoryDocumentTypes';

type Props = {
  open: boolean;
  handleClose: () => void;
  data?: CategoryDocumentsField;
  addCategoryDocument: (data: CategoryDocumentsField) => void;
  updateCategoryDocument: (data: CategoryDocumentsField) => void;
};

type FormValidateType = {
  name: string;
  prefix: string;
};

const CategoryDrawer = (props: Props) => {
  const { open, handleClose, data, addCategoryDocument, updateCategoryDocument } = props;

  const { control, reset, handleSubmit, formState: { errors } } = useForm<FormValidateType>({
    defaultValues: { name: data?.name ?? '', prefix: data?.prefix ?? '' },
  });

  useEffect(() => {
    if (data) {
      reset({ name: data.name, prefix: data.prefix });
    } else {
      reset({ name: '', prefix: '' });
    }
  }, [data, reset]);

  const onSubmit = (formData: FormValidateType) => {
    if (data) {
      updateCategoryDocument({name: formData.name, prefix: formData.prefix});
    } else {
      addCategoryDocument({name: formData.name, prefix: formData.prefix});
    }
    handleClose();
  };

  return (
    <Drawer anchor='right' open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant='h6' className='p-4'>
          {data ? 'Edit Category Document' : 'Add New Category Document'}
        </Typography>
        <Divider />
        <div className='p-4'>
          <Controller
            name='name'
            control={control}
            rules={{ required: 'Category name is required' }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                label='Category Name'
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ''}
              />
            )}
          />
        </div>
        <div className='p-4'>
          <Controller
            name='prefix'
            control={control}
            rules={{ required: 'Prefix is required' }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                label='prefix'
                error={!!errors.prefix}
                helperText={errors.prefix ? errors.prefix.message : ''}
              />
            )}
          />
        </div>
        <Divider />
        <div className='flex justify-end p-4'>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type='submit' variant='contained' color='primary'>
            {data ? 'Update' : 'Add'}
          </Button>
        </div>
      </form>
    </Drawer>
  );
};

export default CategoryDrawer;
