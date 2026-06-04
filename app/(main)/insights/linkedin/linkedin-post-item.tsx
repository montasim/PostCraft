"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  IconThumbUp,
  IconMessage2,
  IconShare3,
  IconDots,
  IconTrash,
  IconEdit,
  IconExternalLink,
  IconWorld,
  IconChevronDown,
  IconInfoCircle,
} from "@tabler/icons-react"
import { formatDistanceToNow } from "date-fns"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { deleteLinkedinPost, updateLinkedinPost } from "./actions"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LinkedinPostItem({ post, user }: { post: any; user: any }) {
  const isPublished = post.status === "published"
  const isScheduled = post.status === "scheduled"
  const isFailed = post.status === "failed"

  let postLink = "#"
  if (isPublished && post.urn) {
    postLink = `https://www.linkedin.com/feed/update/${post.urn}/`
  }

  const [isDeleting, setIsDeleting] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  
  const [editData, setEditData] = useState({
    text: post.text,
    hashtags: post.hashtags ? post.hashtags.join(" ") : "",
    scheduledTime: post.scheduledTime ? new Date(new Date(post.scheduledTime).getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16) : ""
  })
  const [isSaving, setIsSaving] = useState(false)

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return
    setIsDeleting(true)
    try {
      await deleteLinkedinPost(post._id.toString())
      toast.success("Post deleted")
    } catch (err) {
      toast.error("Failed to delete post")
    } finally {
      setIsDeleting(false)
    }
  }

  const handleEdit = async () => {
    setIsSaving(true)
    try {
      const hashtagsArray = editData.hashtags
        .split(" ")
        .map((t: string) => t.trim())
        .filter((t: string) => t.length > 0)
        .map((t: string) => t.startsWith("#") ? t : `#${t}`)
        
      await updateLinkedinPost(
        post._id.toString(),
        editData.text,
        hashtagsArray,
        isScheduled && editData.scheduledTime ? new Date(editData.scheduledTime) : undefined
      )
      toast.success("Post updated")
      setIsEditDialogOpen(false)
    } catch (err) {
      toast.error("Failed to update post")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <>
      <div className="w-full h-full rounded-lg border bg-card text-card-foreground p-0 shadow-sm relative transition-opacity duration-200 flex flex-col" style={{ opacity: isDeleting ? 0.5 : 1 }}>
        <div className="flex items-start gap-3 border-b px-4 py-3">
          <Avatar className="h-12 w-12 rounded-full">
            <AvatarImage src={user?.image || ""} />
            <AvatarFallback className="bg-primary text-sm font-semibold text-primary-foreground">
              {user?.name?.[0]?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-foreground">{user?.name || "Your Name"}</p>
              <Badge
                variant="outline"
                className={`text-[10px] px-1.5 h-4 min-h-0 py-0 ${
                  isPublished
                    ? "border-emerald-500/30 text-emerald-600 bg-emerald-500/10"
                    : isScheduled
                      ? "border-blue-500/30 text-blue-600 bg-blue-500/10"
                      : "border-destructive/30 text-destructive bg-destructive/10"
                }`}
              >
                {post.status}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground truncate">{user?.email || "Software Engineer"}</p>
            <p className="text-[11px] text-muted-foreground">
              {isScheduled && post.scheduledTime
                ? `Scheduled for ${new Date(post.scheduledTime).toLocaleString()}`
                : `${formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}`}
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="shrink-0 text-muted-foreground hover:text-foreground focus:outline-none">
                <IconDots className="h-5 w-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              {isPublished && post.urn && (
                <DropdownMenuItem asChild>
                  <a href={postLink} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
                    <IconExternalLink className="mr-2 h-4 w-4" />
                    View on LinkedIn
                  </a>
                </DropdownMenuItem>
              )}
              {(!isPublished) && (
                <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)} className="cursor-pointer">
                  <IconEdit className="mr-2 h-4 w-4" />
                  Edit Post
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={handleDelete} className="cursor-pointer text-destructive focus:text-destructive">
                <IconTrash className="mr-2 h-4 w-4" />
                Delete Post
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-3 px-4 py-3 flex-1">
          <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
            {post.text}
          </div>
          
          {post.hashtags && post.hashtags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {post.hashtags.map((tag: string) => (
                <span key={tag} className="text-sm font-semibold text-primary hover:underline cursor-pointer">
                  {tag.startsWith("#") ? tag : `#${tag}`}
                </span>
              ))}
            </div>
          )}
          
          {post.error && (
            <div className="mt-2 rounded-md bg-destructive/10 p-2 text-xs text-destructive">
              Error: {post.error}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t px-4 py-2 text-muted-foreground">
          <div className="flex items-center gap-1.5 text-xs">
            <IconThumbUp className="h-3.5 w-3.5 text-primary" />
            <span className="text-[11px]">0</span>
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            <span>0 comments</span>
            <span>0 reposts</span>
          </div>
        </div>

        <div className="flex items-center justify-around border-t px-2 py-1">
          {[
            { icon: IconThumbUp, label: "Like" },
            { icon: IconMessage2, label: "Comment" },
            { icon: IconShare3, label: "Repost" },
            { icon: IconShare3, label: "Send" },
          ].map(({ icon: Icon, label }) => (
            <button
              key={label}
              className="flex items-center gap-1.5 rounded px-3 py-2 text-sm font-semibold text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <Icon className="h-5 w-5" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="p-0 sm:max-w-[550px] gap-0 overflow-hidden bg-background">
          <DialogHeader className="border-b px-6 py-4">
            <DialogTitle className="text-xl font-normal text-foreground">Edit post</DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col overflow-y-auto max-h-[70vh]">
            <div className="px-6 py-4 flex items-center gap-3">
              <Avatar className="h-12 w-12 rounded-full">
                <AvatarImage src={user?.image || ""} />
                <AvatarFallback className="bg-primary text-sm font-semibold text-primary-foreground">
                  {user?.name?.[0]?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-[15px] font-semibold text-foreground leading-tight">{user?.name || "Your Name"}</p>
                <button className="mt-1 flex items-center gap-1 rounded-full border border-muted-foreground/30 px-3 py-1 text-xs font-semibold text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                  <IconWorld className="h-3.5 w-3.5" />
                  Anyone
                  <IconChevronDown className="h-3.5 w-3.5 ml-1" />
                </button>
              </div>
            </div>

            <div className="px-6 pb-6">
              <Textarea 
                value={editData.text} 
                onChange={e => setEditData(prev => ({...prev, text: e.target.value}))}
                className="min-h-[200px] border-0 focus-visible:ring-1 focus-visible:ring-primary/50 px-4 py-3 resize-none text-[15px] leading-relaxed text-foreground shadow-none placeholder:text-muted-foreground bg-muted/40 rounded-lg"
                placeholder="What do you want to talk about?"
              />
              
              <div className="mt-5 space-y-5">
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground font-semibold uppercase tracking-wider ml-1">Hashtags</Label>
                  <Input 
                    value={editData.hashtags} 
                    onChange={e => setEditData(prev => ({...prev, hashtags: e.target.value}))}
                    placeholder="Add hashtags (e.g. #programming)"
                    className="h-11 text-sm font-semibold text-primary border-0 focus-visible:ring-1 focus-visible:ring-primary/50 rounded-lg px-4 shadow-none bg-muted/40"
                  />
                </div>

                {isScheduled && (
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center gap-1.5 ml-1">
                      <Label className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Scheduled Time</Label>
                      <TooltipProvider delayDuration={200}>
                        <Tooltip>
                          <TooltipTrigger type="button" className="focus:outline-none">
                            <IconInfoCircle className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground cursor-help transition-colors" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-[260px] text-center p-3 leading-relaxed" side="top" sideOffset={8}>
                            <p>We do not schedule posts directly on LinkedIn. Instead, PostCraft holds your post securely on our servers and automatically publishes it to your account at the scheduled time.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Input 
                      type="datetime-local" 
                      value={editData.scheduledTime} 
                      onChange={e => setEditData(prev => ({...prev, scheduledTime: e.target.value}))}
                      className="h-11 text-sm border-0 focus-visible:ring-1 focus-visible:ring-primary/50 rounded-lg px-4 shadow-none bg-muted/40 dark:[color-scheme:dark]"
                      style={{ accentColor: "hsl(var(--primary))" }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <DialogFooter className="m-0 px-6 py-4 border-t flex items-center justify-end sm:justify-end bg-background rounded-none">
            <Button 
              className="rounded-full px-6 h-10 font-semibold bg-primary hover:bg-primary/90 text-primary-foreground transition-colors" 
              onClick={handleEdit} 
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
