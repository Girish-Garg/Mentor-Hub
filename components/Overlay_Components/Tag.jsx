import { MultiSelect } from '@mantine/core';

function Tag() {
  return (
    <MultiSelect
      label="Your favorite libraries"
      placeholder="Pick value"
      data={[
        { group: 'Frontend', items: ['React', 'Angular'] },
        { group: 'Backend', items: ['Express', 'Django'] },
      ]}
      searchable
      nothingFoundMessage="Nothing found..."
    />
  );
}
export default Tag;