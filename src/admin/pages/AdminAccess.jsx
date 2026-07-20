import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, ShieldCheck } from "lucide-react";
import apiClient from "../api/axiosClient";
export default function AdminAccess() {
    const [code, setCode] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await apiClient.post("/setting/admin-access", {
                code,
            });

            if (data.data.success) {
                sessionStorage.setItem("admin_access", "true");
                navigate("/clinic-admin", { replace: true });
            } else {
                alert("كود الإدارة غير صحيح");
            }
        } catch (err) {
            console.error(err);
            alert("حدث خطأ أثناء التحقق من الكود");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
            <div className="w-full max-w-md rounded-2xl bg-white shadow-xl p-8">
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-primary-500 flex items-center justify-center text-white">
                        <ShieldCheck size={32} />
                    </div>
                </div>

                <h1 className="text-2xl font-bold text-center text-slate-800">
                    لوحة الإدارة
                </h1>

                <p className="text-center text-slate-500 mt-2 mb-8">
                    أدخل كود الإدارة للمتابعة
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="relative">
                        <Lock
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                            size={18}
                        />

                        <input
                            type="password"
                            placeholder="كود الإدارة"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="w-full rounded-xl border border-slate-300 px-10 py-3 outline-none focus:ring-2 focus:ring-primary-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-xl bg-primary-500 py-3 text-white font-semibold hover:bg-primary-600 transition"
                    >
                        دخول
                    </button>
                </form>
            </div>
        </div>
    );
}