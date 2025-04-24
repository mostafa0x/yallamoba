import React, { useEffect } from 'react'

export default function RoleSelector(props: any) {

    return (
        <div>
            <label className="block text-sm mb-1">Your main role</label>
            <select
                name="role"
                onChange={props.Formik.handleChange}
                onBlur={props.Formik.handleBlur}
                value={props.Formik.values.role}
                className="w-full px-3 py-2  border rounded"
                required
            >
                <option value="">Select your role</option>
                <option value="Roam">Roam</option>
                <option value="Jungle">Jungle</option>
                <option value="Mid">Mid</option>
                <option value="MM">MM</option>
                <option value="Exp">Exp</option>
            </select>
        </div>
    )
}
