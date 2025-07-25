import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { useLostFound } from "@/hooks/useLostFound";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { DialogTitle } from "@/components/ui/dialog";
import { Plus, Filter, Trash } from "lucide-react";
import api from "@/services/api";
import dayjs from "dayjs";
import { toast } from "@/components/ui/use-toast";

interface ResponseEntry {
  finder: { _id: string; name: string; email: string };
  imageUrl?: string;
  message: string;
  createdAt: string;
}

interface LostItem {
  _id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  reporter: string;
  imageUrl?: string;
  createdAt: string;
  isResolved: boolean;
  responses?: ResponseEntry[];
}

const categories = [
  { id: "all", label: "All" },
  { id: "electronics", label: "Electronics" },
  { id: "books", label: "Books" },
  { id: "documents", label: "Documents" },
  { id: "clothes", label: "Clothes" },
  { id: "others", label: "Others" },
];

const LostFound = () => {
  const handleDelete = async(id:string)=>{
    try{
      if(!window.confirm('Delete this report?')) return;
      await api.delete(`/lostfound/${id}`);
      toast({title:'Deleted'});
      refetch();
    }catch{toast({title:'Delete failed',variant:'destructive'});}
  };

  const handleClose = async (id: string) => {
    try {
      await api.put(`/lostfound/${id}/close`);
      toast({ title: 'Marked as resolved' });
      refetch();
    } catch {
      toast({ title: 'Failed', variant: 'destructive' });
    }
  };
  const { user } = useAuth();
  const { data: items = [], refetch } = useLostFound();
  const [showReport, setShowReport] = useState(false);
  const [filterCat, setFilterCat] = useState("all");
  const [filterDate, setFilterDate] = useState("all");
  const [replyTarget, setReplyTarget] = useState<LostItem | null>(null);
  const [replyForm, setReplyForm] = useState({ message: "", image: undefined as File | undefined });

  const [reportForm, setReportForm] = useState({
    title: "",
    description: "",
    category: "electronics",
    location: "",
    image: undefined as File | undefined,
  });

  const handleReport = async () => {
    try {
      const fd = new FormData();
      Object.entries(reportForm).forEach(([k, v]) => {
        if (k === "image" && v) fd.append("image", v as Blob);
        else if (k !== "image") fd.append(k, v as string);
      });
      await api.post("/lostfound", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast({ title: "Item reported" });
      setShowReport(false);
      setReportForm({ title: "", description: "", category: "electronics", location: "", image: undefined });
      refetch();
    } catch {
      toast({ title: "Report failed", variant: "destructive" });
    }
  };

  const filtered = items
    .filter((i: LostItem) => (filterCat === "all" ? true : i.category === filterCat))
    .filter((i: LostItem) => {
      if (filterDate === "24h") return dayjs().diff(dayjs(i.createdAt), "hour") <= 24;
      if (filterDate === "7d") return dayjs().diff(dayjs(i.createdAt), "day") <= 7;
      return true;
    });

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Lost & Found</h1>
          <div className="flex gap-2">
            <Button variant="campus-outline" onClick={() => setShowReport(true)}>
              <Plus className="h-4 w-4 mr-2" /> Report Item
            </Button>
            <Button variant="ghost" className="md:hidden">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 items-center">
          <select title="Filter by category" value={filterCat} onChange={(e) => setFilterCat(e.target.value)} className="border rounded p-2">
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
          <select title="Filter by date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} className="border rounded p-2">
            <option value="all">All dates</option>
            <option value="24h">Last 24h</option>
            <option value="7d">Last 7d</option>
          </select>
        </div>

        {/* List */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item: LostItem) => (
            <Card
            key={item._id}
            className={`p-4 space-y-2 ${item.isResolved ? 'border border-green-500 bg-green-50' : ''}`}
          >
              {item.imageUrl && (
                <img
                  src={`${api.defaults.baseURL?.replace('/api', '')}${item.imageUrl}`}
                  alt={item.title}
                  className="h-48 w-full object-cover rounded"
                />
              )}
              <div className="flex items-center gap-2">
                <h2 className="font-semibold text-lg">{item.title}</h2>
                {item.isResolved && <Badge className="bg-green-500 text-white">Found</Badge>}
              </div>
              <p className="text-muted-foreground text-sm">{item.description}</p>
              <div className="flex gap-2 items-center text-sm">
                <Badge>{item.category}</Badge>
                <span>{dayjs(item.createdAt).fromNow()}</span>
              </div>
              <p className="text-sm text-foreground/80">Location: {item.location}</p>
              {/* Responses for reporter */}
              {item.reporter === user?.id && item.responses && item.responses.length > 0 && (
                <div className="border-t pt-2 space-y-2">
                  <h3 className="text-sm font-semibold">Responses</h3>
                  {item.responses.map((r, idx) => (
                    <div key={idx} className="p-2 border rounded space-y-1">
                      <div className="text-sm">
                        <span className="font-medium">{r.finder.name}</span> ({r.finder.email})
                        <span className="ml-2 text-xs text-muted-foreground">{dayjs(r.createdAt).fromNow()}</span>
                      </div>
                      <p className="text-sm whitespace-pre-line">{r.message}</p>
                      {r.imageUrl && (
                        <img
                          src={`${api.defaults.baseURL?.replace('/api', '')}${r.imageUrl}`}
                          alt="response-image" className="h-40 w-auto rounded"
                        />
                      )}
                      <Button size="sm" variant="destructive" onClick={() => handleClose(item._id)}>Close</Button>
                    </div>
                  ))}
                </div>
              )}
              {/* Reply Found button for non-reporters */}
              {item.reporter !== user?.id && !item.isResolved && (
                <Button size="sm" variant="info" onClick={() => setReplyTarget(item)}>
                  I found it
                </Button>
              )}
              {/* Admin resolve */}
              {(user?.role === "admin" || item.reporter === user?.id) && !item.isResolved && (
                <Button
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={async () => {
                    await handleClose(item._id);
                    refetch();
                  }}
                >
                  Mark Resolved
                </Button>
              )}
              {user?.role==='admin' && (
                <Button size="icon" variant="ghost" onClick={()=>handleDelete(item._id)}>
                  <Trash className="h-4 w-4 text-destructive"/>
                </Button>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* Report dialog */}
      <Dialog open={showReport} onOpenChange={setShowReport}>
        <DialogContent className="space-y-3">
          <DialogHeader>Report Lost / Found Item</DialogHeader>
          <Input
            placeholder="Title"
            value={reportForm.title}
            onChange={(e) => setReportForm({ ...reportForm, title: e.target.value })}
          />
          <textarea
            className="border rounded p-2 w-full"
            rows={3}
            placeholder="Description"
            value={reportForm.description}
            onChange={(e) => setReportForm({ ...reportForm, description: e.target.value })}
          />
          <select
            title="Item category"
            className="border rounded p-2 w-full"
            value={reportForm.category}
            onChange={(e) => setReportForm({ ...reportForm, category: e.target.value })}
          >
            {categories.filter((c) => c.id !== "all").map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
          <Input
            placeholder="Location"
            value={reportForm.location}
            onChange={(e) => setReportForm({ ...reportForm, location: e.target.value })}
          />
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setReportForm({ ...reportForm, image: e.target.files?.[0] })}
          />
          <DialogFooter>
            <Button onClick={handleReport}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reply dialog */}
      <Dialog open={!!replyTarget} onOpenChange={() => setReplyTarget(null)}>
        <DialogContent className="space-y-3">
          <DialogHeader>
            <DialogTitle>Send details to reporter</DialogTitle>
          </DialogHeader>
          <textarea
            className="border rounded p-2 w-full"
            rows={3}
            placeholder="Message to reporter"
            value={replyForm.message}
            onChange={(e) => setReplyForm({ ...replyForm, message: e.target.value })}
          />
          <Input type="file" accept="image/*" onChange={(e) => setReplyForm({ ...replyForm, image: e.target.files?.[0] })} />
          <DialogFooter>
            <Button
              onClick={async () => {
                if (!replyTarget) return;
                try {
                  const fd = new FormData();
                  fd.append("message", replyForm.message);
                  if (replyForm.image) fd.append("image", replyForm.image);
                  await api.post(`/lostfound/${replyTarget._id}/respond`, fd, {
                    headers: { "Content-Type": "multipart/form-data" },
                  });
                  toast({ title: "Response sent" });
                  setReplyTarget(null);
                  setReplyForm({ message: "", image: undefined });
                  refetch();
                } catch {
                  toast({ title: "Failed", variant: "destructive" });
                }
              }}
            >
              Send
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LostFound;
