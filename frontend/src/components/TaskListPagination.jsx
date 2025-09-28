import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import {cn} from "@/lib/utils.js";

function TaskListPagination({
                                handleNext, handlePrev, handlePageChange, page, totalPages
                            }) {
                                console.log("🚀 ~ TaskListPagination ~ page, totalPages: ", page, totalPages);

    const generatePages = () => {
        const pages = [];

        if (totalPages < 4) {
            // hiện toàn bộ
            for (let i = 1;
                 i <= totalPages;
                 i++
            ) {
                pages.push(i)
            }
        } else {
            if (page <= 2) {
                pages.push(1, 2, 3, "...", totalPages);
            } else if (page >= totalPages - 1) {
                pages.push("...", totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, "...", page, "...", totalPages);
            }
        }
        return pages;
    }

    const pagesToShow = generatePages();
    return (
        <div className='flex justify-center'>
            <Pagination>
                <PaginationContent>
                    {/* Trước */}
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={page === 1 ? undefined : handlePrev}
                            className={cn("cursor-pointer", page === 1 && "pointer-events-none opacity-50")}
                        />
                    </PaginationItem>
                    {pagesToShow.map((p, index)=> (
                        <PaginationItem key={index}>
                            {p === "..." ? (
                                <PaginationEllipsis />
                            ): (
                                <PaginationLink
                                    isActive={page === p}
                                    onClick={() =>{
                                        if(p !== page){
                                            handlePageChange(p)
                                        }
                                    }}
                                    className="cursor-pointer"
                                >
                                    {p}
                                </PaginationLink>
                            )}
                        </PaginationItem>
                    ))}
                    {/*/!* Số *!/*/}
                    {/*<PaginationItem>*/}
                    {/*    <PaginationLink href="#">1</PaginationLink>*/}
                    {/*</PaginationItem>*/}
                    {/*<PaginationItem>*/}
                    {/*    <PaginationLink href="#" isActive>*/}
                    {/*        2*/}
                    {/*    </PaginationLink>*/}
                    {/*</PaginationItem>*/}
                    {/*<PaginationItem>*/}
                    {/*    <PaginationLink href="#">3</PaginationLink>*/}
                    {/*</PaginationItem>*/}
                    {/*/!* 3 chấm *!/*/}
                    {/*<PaginationItem>*/}
                    {/*    <PaginationEllipsis/>*/}
                    {/*</PaginationItem>*/}
                    {/* Sau */}
                    <PaginationItem>
                        <PaginationNext
                            onClick={page === totalPages ? undefined : handleNext}
                            className={cn("cursor-pointer", page === totalPages && "pointer-events-none opacity-50")}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination></div>
    )
}

export default TaskListPagination;