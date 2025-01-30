import { getInstitutions } from '@/http/get-institutions'
import { cn } from '@/libs/utils'
import { Institution } from '@/type/institution'
import { useQuery } from '@tanstack/react-query'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'
import { AccountIconLabel } from './account-icon-label'
import { Button } from './ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

interface InstitutionSelectProps {
  type?: 'bank' | 'card'
  onChange: (institutionId: string) => void
  institution?: Institution
}

export function InstitutionSelect({
  onChange,
  type = 'bank',
  institution,
}: InstitutionSelectProps) {
  const [showPopover, setShowPopover] = useState(false)
  const [selectedInstitution, setSelectedInstitution] =
    useState<Institution | null>(institution || null)

  const { data } = useQuery({
    queryKey: ['institutions', type],
    queryFn: () => getInstitutions({ type }),
    placeholderData: (previousData) => previousData,
  })

  const handleSelectInstitution = (institution: Institution) => {
    setSelectedInstitution(institution)
    setShowPopover(false)
    onChange(institution.id)
  }

  return (
    <Popover modal={true} open={showPopover} onOpenChange={setShowPopover}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-full justify-between pl-3 text-sm font-normal',
            !selectedInstitution && 'text-muted-foreground',
          )}
        >
          {selectedInstitution ? (
            <AccountIconLabel
              url={selectedInstitution.logo_url}
              label={selectedInstitution.name}
              className="size-6"
            />
          ) : (
            'Selecione uma instituição'
          )}
          <ChevronsUpDown className="ml-auto opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandInput
            className="border-0 shadow-none focus-visible:ring-0"
            placeholder="Pesquisar instituições..."
          />
          <CommandList className="max-h-[250px]">
            <CommandEmpty>Instituição não encontrada.</CommandEmpty>
            <CommandGroup>
              {data?.map((institution: Institution) => (
                <CommandItem
                  key={institution.id}
                  onSelect={() => handleSelectInstitution(institution)}
                  className="text-md mb-1 cursor-pointer"
                >
                  <AccountIconLabel
                    url={institution.logo_url}
                    label={institution.name}
                  />
                  <Check
                    className={cn(
                      'ml-auto',
                      selectedInstitution?.id === institution.id
                        ? 'opacity-80'
                        : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
