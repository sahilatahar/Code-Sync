import PropTypes from "prop-types"
import { PiCaretDownBold } from "react-icons/pi"

function Select({ onChange, value, options, title }) {
    return (
        <div className="relative w-full">
            <label className="mb-2">{title}</label>
            <select
                className="w-full rounded-md border-none bg-darkHover px-4 py-2 text-white outline-none"
                value={value}
                onChange={onChange}
            >
                {Object.entries(options)
                    .sort()
                    .map((option) => {
                        const value = option[0]
                        const name =
                            option[0].charAt(0).toUpperCase() +
                            option[0].slice(1)

                        return (
                            <option key={name} value={value}>
                                {name}
                            </option>
                        )
                    })}
            </select>
            <PiCaretDownBold
                size={16}
                className="absolute bottom-3 right-4 z-10 text-white"
            />
        </div>
    )
}

Select.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    options: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
}

export default Select
