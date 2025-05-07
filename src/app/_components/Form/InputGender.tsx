import React from "react";
export default function InputGender({ Formik }: any) {
    return <>
        <label className="block text-sm mt-4 mb-1">Gender</label>
        <div className="flex gap-4">
            <label className="flex items-center gap-2">
                <input type="radio" name="gender" checked={Formik.values.gender === "Male"} onChange={() => Formik.setFieldValue("gender", "Male")} />
                Male
            </label>
            <label className="flex items-center gap-2">
                <input type="radio" name="gender" checked={Formik.values.gender === "Female"} onChange={() => Formik.setFieldValue("gender", "Female")} />
                Female
            </label>
        </div>
        {Formik.touched.gender && Formik.errors.gender && <p className="text-red-500 text-sm animate-shake">
            {Formik.errors.gender}
        </p>}
    </>;
}
