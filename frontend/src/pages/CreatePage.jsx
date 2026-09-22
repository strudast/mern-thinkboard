import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import api from "../lib/axios";

const CreatePage = () => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!title.trim() || !content.trim()) {
			toast.error("All fields are required");
			return;
		}
		setLoading(true);
		try {
			await api.post("/notes", {
				title,
				content,
			});
			toast.success("note created");
			navigate("/");
		} catch (error) {
			console.error(error);

			if (error.response.status === 429) {
				toast.error("slow down mate!", {
					duration: 4000,
				});
			} else {
				toast.error("failed to create note");
			}
		} finally {
			setLoading(false);
		}
	};
	return (
		<div className="min-h-screen bg-base-200">
			<div className="container mx-auto px-4 py-8">
				<div className="max-w-2xl mx-auto">
					<Link to={"/"} className="btn btn-ghost mb-6">
						<ArrowLeft className="size-5" />
						Back to Notes
					</Link>
					<div className="card bg-base-100">
						<div className="card-body">
							<h2 className="card-title text-2xl mb-4">
								Create New Note
							</h2>
							<form onSubmit={handleSubmit}>
								<div className="form-control mb-4">
									<label htmlFor="" className="label">
										<span className="label-text">
											Title
										</span>
									</label>
									<input
										value={title}
										onChange={(e) =>
											setTitle(e.target.value)
										}
										className="input input-bordered"
										type="text"
										placeholder="Note Title.."
									></input>
								</div>
								<div className="form-control mb-4">
									<label htmlFor="" className="label">
										<span className="label-text">
											Content
										</span>
									</label>
									<textarea
										value={content}
										onChange={(e) =>
											setContent(e.target.value)
										}
										className="textarea textarea-bordered h-32"
										type="text"
										placeholder="Note Content.."
									></textarea>
								</div>
								<div className="card-actions justify-end">
									<button
										type="submit"
										className="btn btn-primary"
										disabled={loading}
									>
										{loading ? "creating..." : "create"}
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreatePage;
