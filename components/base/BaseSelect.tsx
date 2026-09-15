import { cn } from 'cn'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

type BaseSelectProps = React.ComponentProps<typeof Select> & {
    items: {
        value: string | number
        label: string
    }[]
    placeholder?: string
    className?: string
    invalid?: boolean
}

const BaseSelect = ({ items, placeholder, className, value, invalid, ...props }: BaseSelectProps) => {
    return (
        <Select items={items} value={value} {...props}>
            <SelectTrigger className={cn(className)} aria-invalid={invalid}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {items.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                            {item.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default BaseSelect