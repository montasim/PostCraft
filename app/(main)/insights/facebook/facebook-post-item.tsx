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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { deleteFacebookPost, updateFacebookPost } from "./actions"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function FacebookPostItem({ post, user }: { post: any; user: any }) {
  const isPublished = post.status === "published"
  const isScheduled = post.status === "scheduled"
  const isFailed = post.status === "failed"

  let postLink = "#"
  if (isPublished && post.postId) {
    postLink = `https://www.facebook.com/${post.postId}`
  }

  const [isDeleting, setIsDeleting] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const [editData, setEditData] = useState({
    text: post.text,
    hashtags: post.hashtags ? post.hashtags.join(" ") : "",
    scheduledTime: post.scheduledTime
      ? new Date(
          new Date(post.scheduledTime).getTime() -
            new Date().getTimezoneOffset() * 60000
        )
          .toISOString()
          .slice(0, 16)
      : "",
  })
  const [isSaving, setIsSaving] = useState(false)

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return
    setIsDeleting(true)
    try {
      await deleteFacebookPost(post._id.toString())
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
        .map((t: string) => (t.startsWith("#") ? t : `#${t}`))

      await updateFacebookPost(
        post._id.toString(),
        editData.text,
        hashtagsArray,
        isScheduled && editData.scheduledTime
          ? new Date(editData.scheduledTime)
          : undefined
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
      <div
        className="relative flex h-full w-full flex-col rounded-lg border bg-card p-0 text-card-foreground shadow-sm transition-opacity duration-200"
        style={{ opacity: isDeleting ? 0.5 : 1 }}
      >
        <div className="flex items-start gap-3 border-b px-4 py-3">
          <Avatar className="h-12 w-12 rounded-full">
            <AvatarImage src={user?.image || ""} />
            <AvatarFallback className="bg-[#1877F2] text-sm font-semibold text-white">
              {user?.name?.[0]?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-foreground">
                {user?.name || "Your Name"}
              </p>
              <Badge
                variant="outline"
                className={`h-4 min-h-0 px-1.5 py-0 text-[10px] ${
                  isPublished
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600"
                    : isScheduled
                      ? "border-blue-500/30 bg-blue-500/10 text-blue-600"
                      : "border-destructive/30 bg-destructive/10 text-destructive"
                }`}
              >
                {post.status}
              </Badge>
            </div>
            <p className="pt-0.5 text-[11px] text-muted-foreground">
              {isScheduled && post.scheduledTime
                ? `Scheduled for ${new Date(post.scheduledTime).toLocaleString()}`
                : `${formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}`}{" "}
              · <IconWorld className="-mt-0.5 inline-block h-3 w-3" />
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="shrink-0 text-muted-foreground hover:text-foreground focus:outline-none">
                <IconDots className="h-5 w-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              {isPublished && post.postId && (
                <DropdownMenuItem asChild>
                  <a
                    href={postLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer"
                  >
                    <IconExternalLink className="mr-2 h-4 w-4" />
                    View on Facebook
                  </a>
                </DropdownMenuItem>
              )}
              {!isPublished && (
                <DropdownMenuItem
                  onClick={() => setIsEditDialogOpen(true)}
                  className="cursor-pointer"
                >
                  <IconEdit className="mr-2 h-4 w-4" />
                  Edit Post
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                onClick={handleDelete}
                className="cursor-pointer text-destructive focus:text-destructive"
              >
                <IconTrash className="mr-2 h-4 w-4" />
                Delete Post
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex-1 space-y-3 px-4 py-3">
          <div className="text-sm leading-relaxed whitespace-pre-wrap text-foreground">
            {post.text}
          </div>

          {post.hashtags && post.hashtags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {post.hashtags.map((tag: string) => (
                <span
                  key={tag}
                  className="cursor-pointer text-sm font-semibold text-[#1877F2] hover:underline"
                >
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
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#1877F2] text-white">
              <IconThumbUp className="h-2.5 w-2.5" />
            </span>
            <span className="text-[11px]">0</span>
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            <span>0 comments</span>
            <span>0 shares</span>
          </div>
        </div>

        <div className="flex items-center justify-around border-t px-2 py-1">
          {[
            { icon: IconThumbUp, label: "Like" },
            { icon: IconMessage2, label: "Comment" },
            { icon: IconShare3, label: "Share" },
          ].map(({ icon: Icon, label }) => (
            <button
              key={label}
              className="flex items-center gap-1.5 rounded px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Icon className="h-5 w-5" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="gap-0 overflow-hidden bg-background p-0 sm:max-w-[550px]">
          <DialogHeader className="border-b px-6 py-4">
            <DialogTitle className="text-xl font-normal text-foreground">
              Edit post
            </DialogTitle>
          </DialogHeader>

          <div className="flex max-h-[70vh] flex-col overflow-y-auto">
            <div className="flex items-center gap-3 px-6 py-4">
              <Avatar className="h-10 w-10 rounded-full">
                <AvatarImage src={user?.image || ""} />
                <AvatarFallback className="bg-[#1877F2] text-sm font-semibold text-white">
                  {user?.name?.[0]?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-[15px] leading-tight font-semibold text-foreground">
                  {user?.name || "Your Name"}
                </p>
                <button className="mt-1 flex items-center gap-1 rounded-sm bg-muted/50 px-2 py-0.5 text-[11px] font-semibold text-muted-foreground transition-colors hover:bg-muted">
                  <IconWorld className="h-3 w-3" />
                  Public
                  <IconChevronDown className="ml-0.5 h-3 w-3" />
                </button>
              </div>
            </div>

            <div className="px-6 pb-6">
              <Textarea
                value={editData.text}
                onChange={(e) =>
                  setEditData((prev) => ({ ...prev, text: e.target.value }))
                }
                className="min-h-[200px] resize-none rounded-lg border-0 bg-muted/40 px-4 py-3 text-[15px] leading-relaxed text-foreground shadow-none placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-[#1877F2]/50"
                placeholder="What's on your mind?"
              />

              <div className="mt-5 space-y-5">
                <div className="space-y-2">
                  <Label className="ml-1 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                    Hashtags
                  </Label>
                  <Input
                    value={editData.hashtags}
                    onChange={(e) =>
                      setEditData((prev) => ({
                        ...prev,
                        hashtags: e.target.value,
                      }))
                    }
                    placeholder="Add hashtags (e.g. #programming)"
                    className="h-11 rounded-lg border-0 bg-muted/40 px-4 text-sm font-semibold text-[#1877F2] shadow-none focus-visible:ring-1 focus-visible:ring-[#1877F2]/50"
                  />
                </div>

                {isScheduled && (
                  <div className="space-y-2 pt-1">
                    <div className="ml-1 flex items-center gap-1.5">
                      <Label className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                        Scheduled Time
                      </Label>
                      <TooltipProvider delayDuration={200}>
                        <Tooltip>
                          <TooltipTrigger
                            type="button"
                            className="focus:outline-none"
                          >
                            <IconInfoCircle className="h-3.5 w-3.5 cursor-help text-muted-foreground transition-colors hover:text-foreground" />
                          </TooltipTrigger>
                          <TooltipContent
                            className="max-w-[260px] p-3 text-center leading-relaxed"
                            side="top"
                            sideOffset={8}
                          >
                            <p>
                              We do not schedule posts directly on Facebook.
                              Instead, PostCraft holds your post securely on our
                              servers and automatically publishes it to your
                              account at the scheduled time.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Input
                      type="datetime-local"
                      value={editData.scheduledTime}
                      onChange={(e) =>
                        setEditData((prev) => ({
                          ...prev,
                          scheduledTime: e.target.value,
                        }))
                      }
                      className="h-11 rounded-lg border-0 bg-muted/40 px-4 text-sm shadow-none focus-visible:ring-1 focus-visible:ring-[#1877F2]/50 dark:[color-scheme:dark]"
                      style={{ accentColor: "#1877F2" }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <DialogFooter className="m-0 flex items-center justify-end rounded-none border-t bg-background px-6 py-4 sm:justify-end">
            <Button
              className="h-10 rounded-full bg-[#1877F2] px-6 font-semibold text-white transition-colors hover:bg-[#166fe5]"
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
