import { Select } from '@chakra-ui/react'

export default function Tags({tags, func, selectedTags}) {

  return (
    <>
      <Select placeholder='追加' onChange={(e) => func(e)} disabled={selectedTags?.length == 5}>
        {
          tags && tags.map(tag => {
            return (
              <option key={tag.id} value={JSON.stringify(tag)}>
                {tag.name}
              </option>
            )
          })
        }
      </Select>
    </>
  )
}