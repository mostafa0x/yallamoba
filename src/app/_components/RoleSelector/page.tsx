import React, { useEffect } from 'react'

export default function RoleSelector({ Formik }: any) {

    return (
        <div>
            <label className="block text-sm mb-1 ">Your main role</label>
            <select
                name="role"
                onChange={Formik.handleChange}
                onBlur={Formik.handleBlur}
                value={Formik.values.role}
                className={`w-full px-3 py-2  border rounded ${Formik.touched.role && Formik.errors.role ? "border-red-500" : "border-gray-300"}`}
                required
            >
                <option value="">Select your role</option>
                <option value="Roam">Roam</option>
                <option value="Jungle">Jungle</option>
                <option value="Mid">Mid</option>
                <option value="MM">MM</option>
                <option value="Exp">Exp</option>
            </select>
            {Formik.touched.role && Formik.errors.role && (
                <p className="text-red-500 text-sm animate-shake">
                    {Formik.errors.role}
                </p>
            )}
        </div>
    )
}
