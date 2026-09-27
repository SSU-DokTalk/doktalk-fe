/**
 * 자동으로 만든 파일이에요. 직접 고치지 말고 `yarn api:types`로 다시 만들어요.
 * 원본: 백엔드(FastAPI)의 /openapi.json
 */

export interface paths {
  '/books': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Getbookscontroller */
    get: operations['getBooksController_books_get'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/book/{isbn}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Getbookdetailcontroller */
    get: operations['getBookDetailController_book__isbn__get'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/chatbot': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /**
     * Chat
     * @description 챗봇과 대화하기
     *     - 사용자 메시지와 채팅 히스토리를 받아서 AI 응답을 반환
     */
    post: operations['chat_chatbot_post'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/debate': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Getdebatelistcontroller
     * @description 토론방 리스트 조회
     */
    get: operations['getDebateListController_debate_get'];
    put?: never;
    /**
     * Createdebatecontroller
     * @description 토론 작성
     */
    post: operations['createDebateController_debate_post'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/debate/popular': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Getpopulardebatelistcontroller
     * @description 인기 토론방 리스트 조회
     */
    get: operations['getPopularDebateListController_debate_popular_get'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/debates/like': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Getdebatelikecontroller
     * @description 토론의 좋아요 조회
     */
    get: operations['getDebateLikeController_debates_like_get'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/debate/comments/like': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Getdebatecommentlikecontroller
     * @description 토론의 댓글 좋아요 조회. 좋아요한 댓글 id만 돌려줘요.
     */
    get: operations['getDebateCommentLikeController_debate_comments_like_get'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/debate/{debate_id}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Getdebatecontroller
     * @description 단일 토론 조회. 온라인 링크는 주최자와 참여자에게만 담아요.
     */
    get: operations['getDebateController_debate__debate_id__get'];
    /**
     * Updatedebatecontroller
     * @description 토론 수정
     */
    put: operations['updateDebateController_debate__debate_id__put'];
    post?: never;
    /**
     * Deletedebatecontroller
     * @description 토론 삭제
     */
    delete: operations['deleteDebateController_debate__debate_id__delete'];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/debate/{debate_id}/comments': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Getdebatecommentscontroller
     * @description 토론의 댓글 조회. 작성자는 공개 정보(BasicUserSchema)만 담아요.
     */
    get: operations['getDebateCommentsController_debate__debate_id__comments_get'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/debate/{debate_id}/comment': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /**
     * Createdebatecommentcontroller
     * @description 토론의 댓글 작성
     */
    post: operations['createDebateCommentController_debate__debate_id__comment_post'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/debate/{debate_id}/like': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /**
     * Createdebatelikecontroller
     * @description 토론에 좋아요 달기
     */
    post: operations['createDebateLikeController_debate__debate_id__like_post'];
    /**
     * Deletedebatelikecontroller
     * @description 토론의 좋아요 삭제
     */
    delete: operations['deleteDebateLikeController_debate__debate_id__like_delete'];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/debate/comment/{debate_comment_id}/like': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /**
     * Createdebatecommentlikecontroller
     * @description 토론의 댓글에 좋아요 달기
     */
    post: operations['createDebateCommentLikeController_debate_comment__debate_comment_id__like_post'];
    /**
     * Deletedebatecommentlikecontroller
     * @description 토론의 댓글 좋아요 삭제
     */
    delete: operations['deleteDebateCommentLikeController_debate_comment__debate_comment_id__like_delete'];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/debate/comment/{debate_comment_id}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post?: never;
    /**
     * Deletedebatecommentcontroller
     * @description 토론의 댓글 삭제
     */
    delete: operations['deleteDebateCommentController_debate_comment__debate_comment_id__delete'];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/file': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Getfile */
    get: operations['getFile_file_get'];
    put?: never;
    /** Uploadfile */
    post: operations['uploadFile_file_post'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/librarys/is_in_library': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Isinlibrarycontroller */
    get: operations['isInLibraryController_librarys_is_in_library_get'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/library/{isbn}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Addmybookcontroller */
    post: operations['addMyBookController_library__isbn__post'];
    /** Deletemybookcontroller */
    delete: operations['deleteMyBookController_library__isbn__delete'];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/post': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Getpostlistcontroller
     * @description 게시글 리스트 조회 (검색 기능 포함)
     */
    get: operations['getPostListController_post_get'];
    put?: never;
    /**
     * Createpostcontroller
     * @description 게시글 작성
     */
    post: operations['createPostController_post_post'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/post/recent': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Getrecentpostscontroller
     * @description 최근 게시글 조회
     */
    get: operations['getRecentPostsController_post_recent_get'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/posts/like': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Getpostlikecontroller
     * @description 게시글 좋아요 조회
     */
    get: operations['getPostLikeController_posts_like_get'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/post/comments/like': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Getpostcommentlikecontroller
     * @description 게시글의 댓글 좋아요 조회
     */
    get: operations['getPostCommentLikeController_post_comments_like_get'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/post/{post_id}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Getpostcontroller
     * @description 단일 게시글 조회
     */
    get: operations['getPostController_post__post_id__get'];
    /**
     * Updatepostcontroller
     * @description 게시글 수정
     */
    put: operations['updatePostController_post__post_id__put'];
    post?: never;
    /**
     * Deletepostcontroller
     * @description 게시글 삭제
     */
    delete: operations['deletePostController_post__post_id__delete'];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/post/{post_id}/comments': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Getpostcommentscontroller
     * @description 게시글의 댓글들 조회
     */
    get: operations['getPostCommentsController_post__post_id__comments_get'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/post/{post_id}/comment': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /**
     * Createpostcommentcontroller
     * @description 게시글의 댓글 작성
     */
    post: operations['createPostCommentController_post__post_id__comment_post'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/post/{post_id}/like': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Createpostlikecontroller */
    post: operations['createPostLikeController_post__post_id__like_post'];
    /**
     * Deletepostlikecontroller
     * @description 게시글 좋아요 삭제
     */
    delete: operations['deletePostLikeController_post__post_id__like_delete'];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/post/comment/{post_comment_id}/like': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /**
     * Createpostcommentlikecontroller
     * @description 게시글의 댓글에 좋아요 달기
     */
    post: operations['createPostCommentLikeController_post_comment__post_comment_id__like_post'];
    /**
     * Deletepostcommentlikecontroller
     * @description 게시글의 댓글 좋아요 삭제
     */
    delete: operations['deletePostCommentLikeController_post_comment__post_comment_id__like_delete'];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/post/comment/{post_comment_id}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post?: never;
    /**
     * Deletepostcommentcontroller
     * @description 게시글의 댓글 삭제
     */
    delete: operations['deletePostCommentController_post_comment__post_comment_id__delete'];
    options?: never;
    head?: never;
    /**
     * Updatepostcommentcontroller
     * @description 게시글의 댓글 수정
     */
    patch: operations['updatePostCommentController_post_comment__post_comment_id__patch'];
    trace?: never;
  };
  '/purchase/{product_type}/{product_id}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Getpurchasecontroller
     * @description 유저 본인이 해당 상품을 구매했는지 여부 조회
     */
    get: operations['getPurchaseController_purchase__product_type___product_id__get'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/purchase': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /**
     * Createpurchasecontroller
     * @description 무료(0원) 토론방 참여·요약 열람 기록. 가격은 서버가 상품에서 읽어요.
     *
     *     - 유료 상품이면 402 (결제 후 /purchase/confirm으로 만들어요)
     *     - 이미 있으면 409
     */
    post: operations['createPurchaseController_purchase_post'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/purchase/confirm': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /**
     * Confirmpurchasecontroller
     * @description 유료 상품 결제 확인. 토스 결제 창이 넘겨준 paymentKey·orderId·amount를 받아
     *     서버에서 토스에 승인을 요청하고, 승인된 결제만 구매 기록으로 남겨요.
     *
     *     - 금액이 상품 가격과 다르면 400 (승인 요청을 보내지 않아요)
     *     - 토스가 거절하면 402 (detail에 토스의 code·message)
     *     - 이미 산 상품이면 409. 같은 결제로 다시 보내면 같은 기록 id를 돌려줘요.
     */
    post: operations['confirmPurchaseController_purchase_confirm_post'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/purchase/{purchase_id}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post?: never;
    /**
     * Deletepurchasecontroller
     * @description 결제 취소하기
     */
    delete: operations['deletePurchaseController_purchase__purchase_id__delete'];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/summary': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Getsummarylistcontroller
     * @description 요약 리스트 조회
     */
    get: operations['getSummaryListController_summary_get'];
    put?: never;
    /** Createsummarycontroller */
    post: operations['createSummaryController_summary_post'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/summary/popular': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Getpopularsummarylistcontroller
     * @description 인기 요약 리스트 조회
     */
    get: operations['getPopularSummaryListController_summary_popular_get'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/summarys/like': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Getsummarylikecontroller
     * @description 요약의 좋아요 조회
     */
    get: operations['getSummaryLikeController_summarys_like_get'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/summary/comments/like': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Getsummarycommentlikecontroller
     * @description 요약의 댓글 좋아요 조회. 좋아요한 댓글 id만 돌려줘요.
     */
    get: operations['getSummaryCommentLikeController_summary_comments_like_get'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/summary/{summary_id}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Getsummarycontroller
     * @description 단일 요약 조회
     */
    get: operations['getSummaryController_summary__summary_id__get'];
    /**
     * Updatesummarycontroller
     * @description 요약 수정
     */
    put: operations['updateSummaryController_summary__summary_id__put'];
    post?: never;
    /**
     * Deletesummarycontroller
     * @description 요약 삭제
     */
    delete: operations['deleteSummaryController_summary__summary_id__delete'];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/summary/{summary_id}/charged_content': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Getsummarychargedcontentcontroller
     * @description 요약의 유료 컨텐츠 조회
     */
    get: operations['getSummaryChargedContentController_summary__summary_id__charged_content_get'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/summary/{summary_id}/comments': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Getsummarycommentcontroller
     * @description 요약의 댓글 조회. 작성자는 공개 정보(BasicUserSchema)만 담아요.
     */
    get: operations['getSummaryCommentController_summary__summary_id__comments_get'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/summary/{summary_id}/comment': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /**
     * Createsummarycommentcontroller
     * @description 요약의 댓글 작성
     */
    post: operations['createSummaryCommentController_summary__summary_id__comment_post'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/summary/{summary_id}/like': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /**
     * Createsummarylikecontroller
     * @description 요약에 좋아요 달기
     */
    post: operations['createSummaryLikeController_summary__summary_id__like_post'];
    /**
     * Deletesummarylikecontroller
     * @description 요약의 좋아요 삭제
     */
    delete: operations['deleteSummaryLikeController_summary__summary_id__like_delete'];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/summary/comment/{summary_comment_id}/like': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /**
     * Createsummarycommentlikecontroller
     * @description 요약의 댓글에 좋아요 달기
     */
    post: operations['createSummaryCommentLikeController_summary_comment__summary_comment_id__like_post'];
    /**
     * Deletesummarycommentlikecontroller
     * @description 요약의 댓글 좋아요 삭제
     */
    delete: operations['deleteSummaryCommentLikeController_summary_comment__summary_comment_id__like_delete'];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/summary/comment/{summary_comment_id}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post?: never;
    /**
     * Deletesummarycommentcontroller
     * @description 요약의 댓글 삭제
     */
    delete: operations['deleteSummaryCommentController_summary_comment__summary_comment_id__delete'];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/user/me': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Getmyinfocontroller
     * @description 유저 본인의 정보를 반환하는 API
     */
    get: operations['getMyInfoController_user_me_get'];
    put?: never;
    post?: never;
    /** Deleteusercontroller */
    delete: operations['deleteUserController_user_me_delete'];
    options?: never;
    head?: never;
    /** Updateuserinfocontroller */
    patch: operations['updateUserInfoController_user_me_patch'];
    trace?: never;
  };
  '/user/purchase': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Getpurchasescontroller
     * @description 본인의 구매 내역 조회
     */
    get: operations['getPurchasesController_user_purchase_get'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/user/{user_id}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Getuserinfocontroller
     * @description 유저의 공개 프로필. 누구나 볼 수 있어서 이메일·성별·생일은 빼요 (본인 정보는 /user/me).
     */
    get: operations['getUserInfoController_user__user_id__get'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/user/{user_id}/posts': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Getuserpostscontroller */
    get: operations['getUserPostsController_user__user_id__posts_get'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/user/{user_id}/summaries': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Getusersummariescontroller
     * @description 유저가 쓴 요약. 누구나 볼 수 있어서 유료 내용은 다른 목록처럼 가려요.
     */
    get: operations['getUserSummariesController_user__user_id__summaries_get'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/user/{user_id}/mybooks': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Getmybookscontroller */
    get: operations['getMyBooksController_user__user_id__mybooks_get'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/user/{user_id}/purchased-summaries': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Getpurchasedsummariescontroller
     * @description 본인이 산 요약 (최근에 산 순서). 유료 내용은 /summary/{id}/charged_content로 받아요.
     */
    get: operations['getPurchasedSummariesController_user__user_id__purchased_summaries_get'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/user/{user_id}/debates': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Getuserdebatescontroller
     * @description 유저가 연 토론방. 온라인 링크는 주최자 본인에게만 보여요 (참여자는 상세에서 봐요).
     */
    get: operations['getUserDebatesController_user__user_id__debates_get'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/user/{user_id}/purchased-debates': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Getpurchaseddebatescontroller
     * @description 본인이 참여한(산) 토론방 (최근에 참여한 순서)
     */
    get: operations['getPurchasedDebatesController_user__user_id__purchased_debates_get'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/user/{user_id}/followers': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Getfollowerscontroller
     * @description user_id의 팔로워 목록 조회
     */
    get: operations['getFollowersController_user__user_id__followers_get'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/user/{user_id}/followings': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Getfollowerscontroller
     * @description user_id의 팔로잉 목록 조회
     */
    get: operations['getFollowersController_user__user_id__followings_get'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/user/is-following/{target_user_id}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Isfollowingcontroller
     * @description 팔로우 여부 확인
     */
    get: operations['isFollowingController_user_is_following__target_user_id__get'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/user/restore': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Restoreusercontroller */
    post: operations['restoreUserController_user_restore_post'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/user/register': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /**
     * Basicregistercontroller
     * @description 시스템 자체 회원가입 기능
     */
    post: operations['basicRegisterController_user_register_post'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/user/login': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /**
     * Basiclogincontroller
     * @description 시스템 자체 로그인 기능
     */
    post: operations['basicLoginController_user_login_post'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/user/access-token': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /**
     * Refreshaccesstoken
     * @description refresh token을 이용해 access token 갱신
     */
    post: operations['refreshAccessToken_user_access_token_post'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/user/follow/{target_user_id}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /**
     * Followusercontroller
     * @description 유저 팔로우
     */
    post: operations['followUserController_user_follow__target_user_id__post'];
    /**
     * Unfollowusercontroller
     * @description 유저 언팔로우
     */
    delete: operations['unfollowUserController_user_follow__target_user_id__delete'];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/user/profile': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post?: never;
    /** Deleteuserprofilecontroller */
    delete: operations['deleteUserProfileController_user_profile_delete'];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/oauth/{provider}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Oauthregistercontroller
     * @description 소셜 로그인 및 회원가입
     */
    get: operations['oAuthRegisterController_oauth__provider__get'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
}
export type webhooks = Record<string, never>;
export interface components {
  schemas: {
    /** BasicDebateComment */
    BasicDebateComment: {
      /** Id */
      id: number;
      /** User Id */
      user_id: number;
      /** Debate Id */
      debate_id: number;
      /** Upper Comment Id */
      upper_comment_id?: number | null;
      /** Content */
      content?: string | null;
      /** Comments Num */
      comments_num: number;
      /** Likes Num */
      likes_num: number;
      /**
       * Created
       * Format: date-time
       */
      created: string;
      /**
       * Updated
       * Format: date-time
       */
      updated: string;
      user: components['schemas']['BasicUserSchema'];
    };
    /** BasicDebateRes */
    BasicDebateRes: {
      /** Id */
      id: number;
      /** User Id */
      user_id: number;
      /** Isbn */
      isbn: number;
      /** Location */
      location?: string | null;
      /** Link */
      link?: string | null;
      /**
       * Is Online
       * @default false
       */
      is_online: boolean;
      /** Held At */
      held_at?: string | null;
      /** Title */
      title: string;
      /** Content */
      content?: string | null;
      /** Files */
      files?: components['schemas']['FileDto'][] | null;
      /** Price */
      price: number;
      /** Limit */
      limit: number;
      /** Category */
      category: number;
      /** Likes Num */
      likes_num: number;
      /** Comments Num */
      comments_num: number;
      /**
       * Created
       * Format: date-time
       */
      created: string;
      /**
       * Updated
       * Format: date-time
       */
      updated: string;
      user: components['schemas']['BasicUserSchema'];
      book: components['schemas']['BookSchema'];
    };
    /** BasicFollowerSchema */
    BasicFollowerSchema: {
      /** Follower Id */
      follower_id: number;
      /** Following Id */
      following_id: number;
      /**
       * Created
       * Format: date-time
       */
      created: string;
      follower?: components['schemas']['BasicUserSchema'] | null;
    };
    /** BasicFollowingSchema */
    BasicFollowingSchema: {
      /** Follower Id */
      follower_id: number;
      /** Following Id */
      following_id: number;
      /**
       * Created
       * Format: date-time
       */
      created: string;
      following?: components['schemas']['BasicUserSchema'] | null;
    };
    /** BasicLoginReq */
    BasicLoginReq: {
      /**
       * Email
       * Format: email
       */
      email: string;
      /**
       * Password
       * @example testtest123@
       */
      password: string;
    };
    /** BasicMyBookRes */
    BasicMyBookRes: {
      /** User Id */
      user_id: number;
      /** Isbn */
      isbn: number;
      /**
       * Created
       * Format: date-time
       */
      created: string;
      /**
       * Updated
       * Format: date-time
       */
      updated: string;
      user: components['schemas']['BasicUserSchema'];
      book: components['schemas']['BookSchema'];
    };
    /** BasicPostRes */
    BasicPostRes: {
      /** Id */
      id: number;
      /** User Id */
      user_id: number;
      /** Title */
      title: string;
      /** Content */
      content?: string | null;
      /** Files */
      files?: components['schemas']['FileDto'][] | null;
      /** Likes Num */
      likes_num: number;
      /** Comments Num */
      comments_num: number;
      /**
       * Created
       * Format: date-time
       */
      created: string;
      /**
       * Updated
       * Format: date-time
       */
      updated: string;
      user: components['schemas']['BasicUserSchema'];
    };
    /** BasicRegisterReq */
    BasicRegisterReq: {
      /**
       * Email
       * Format: email
       */
      email: string;
      /**
       * Password
       * @example testtest123@
       */
      password: string;
      /** Profile */
      profile?: string | null;
      /** Name */
      name?: string | null;
      /** Gender */
      gender?: boolean | null;
      agreements: components['schemas']['RegisterAgreementsReq'];
    };
    /** BasicSummaryComment */
    BasicSummaryComment: {
      /** Id */
      id: number;
      /** User Id */
      user_id: number;
      /** Summary Id */
      summary_id: number;
      /** Upper Comment Id */
      upper_comment_id?: number | null;
      /** Content */
      content: string;
      /** Comments Num */
      comments_num: number;
      /** Likes Num */
      likes_num: number;
      /**
       * Created
       * Format: date-time
       */
      created: string;
      /**
       * Updated
       * Format: date-time
       */
      updated: string;
      user: components['schemas']['BasicUserSchema'];
    };
    /** BasicSummaryRes */
    BasicSummaryRes: {
      /** Id */
      id: number;
      /** User Id */
      user_id: number;
      /** Isbn */
      isbn: number;
      /** Title */
      title: string;
      /** Free Content */
      free_content?: string | null;
      /** Charged Content */
      charged_content?: string | null;
      /** Price */
      price: number;
      /** Files */
      files?: components['schemas']['FileDto'][] | null;
      /** Category */
      category: number;
      /** Likes Num */
      likes_num: number;
      /** Comments Num */
      comments_num: number;
      /**
       * Created
       * Format: date-time
       */
      created: string;
      /**
       * Updated
       * Format: date-time
       */
      updated: string;
      user: components['schemas']['BasicUserSchema'];
      book: components['schemas']['BookSchema'];
    };
    /** BasicUserSchema */
    BasicUserSchema: {
      /** Id */
      id: number;
      /** Profile */
      profile?: string | null;
      /** Name */
      name?: string | null;
      /** @default USER */
      role: components['schemas']['ROLE'];
      /**
       * Is Deleted
       * @default false
       */
      is_deleted: boolean;
    };
    /** Body_uploadFile_file_post */
    Body_uploadFile_file_post: {
      /**
       * File
       * Format: binary
       */
      file: string;
    };
    /** BookAPIResponseSchema */
    BookAPIResponseSchema: {
      /** Total */
      total: number;
      /** Items */
      items: components['schemas']['BookAPISchema'][];
      /** Page */
      page: number;
      /** Pages */
      pages: number;
    };
    /** BookAPISchema */
    BookAPISchema: {
      /** Title */
      title: string;
      /** Link */
      link?: string | null;
      /** Image */
      image?: string | null;
      /** Author */
      author?: string | null;
      /** Discount */
      discount?: number | null;
      /** Publisher */
      publisher?: string | null;
      /** Pubdate */
      pubdate?: string | null;
      /** Isbn */
      isbn: number;
      /** In Library Num */
      in_library_num?: number | null;
      /** Description */
      description?: string | null;
    };
    /** BookSchema */
    BookSchema: {
      /** Isbn */
      isbn: number;
      /** Title */
      title: string;
      /** Image */
      image?: string | null;
      /** Author */
      author?: string | null;
      /** Publisher */
      publisher?: string | null;
      /** Pubdate */
      pubdate?: string | null;
      /** Description */
      description?: string | null;
      /**
       * In Library Num
       * @default 0
       */
      in_library_num: number;
    };
    /** ChatMessage */
    ChatMessage: {
      /**
       * Role
       * @enum {string}
       */
      role: 'user' | 'model';
      /** Message */
      message: string;
    };
    /** ChatbotRequest */
    ChatbotRequest: {
      /** Message */
      message: string;
      /**
       * Chat History
       * @default []
       */
      chat_history: components['schemas']['ChatMessage'][] | null;
    };
    /** ChatbotResponse */
    ChatbotResponse: {
      /** Message */
      message: string;
      /**
       * Success
       * @default true
       */
      success: boolean;
    };
    /**
     * ConfirmPurchaseReq
     * @description 토스 결제 창이 성공 주소로 넘겨준 값
     */
    ConfirmPurchaseReq: {
      /**
       * Product Type
       * @enum {string}
       */
      product_type: 'D' | 'S';
      /** Product Id */
      product_id: number;
      /** Payment Key */
      payment_key: string;
      /** Order Id */
      order_id: string;
      /** Amount */
      amount: number;
    };
    /** CreateDebateCommentReq */
    CreateDebateCommentReq: {
      /** Upper Comment Id */
      upper_comment_id?: number | null;
      /** Content */
      content: string;
    };
    /** CreateDebateReq */
    CreateDebateReq: {
      /** Title */
      title: string;
      /** Location */
      location?: string | null;
      /** Link */
      link?: string | null;
      /** Held At */
      held_at?: string | null;
      /** Isbn */
      isbn: number;
      /** Category */
      category: number;
      /** Limit */
      limit: number;
      /** Files */
      files?: components['schemas']['FileDto'][] | null;
      /** Content */
      content?: string | null;
      /** Price */
      price: number;
    };
    /** CreatePostCommentReq */
    CreatePostCommentReq: {
      /** Upper Comment Id */
      upper_comment_id?: number | null;
      /** Content */
      content: string;
    };
    /** CreatePostReq */
    CreatePostReq: {
      /**
       * Title
       * @example test
       */
      title: string;
      /** Content */
      content?: string | null;
      /** Files */
      files?: components['schemas']['FileDto'][] | null;
    };
    /**
     * CreatePurchaseReq
     * @description 무료(0원) 상품 참여·열람. 가격은 서버가 상품에서 읽어요.
     *     유료 상품은 결제를 확인하는 /purchase/confirm으로 만들어요.
     */
    CreatePurchaseReq: {
      /**
       * Product Type
       * @enum {string}
       */
      product_type: 'D' | 'S';
      /** Product Id */
      product_id: number;
    };
    /** CreateSummaryCommentReq */
    CreateSummaryCommentReq: {
      /** Upper Comment Id */
      upper_comment_id?: number | null;
      /** Content */
      content: string;
    };
    /** CreateSummaryReq */
    CreateSummaryReq: {
      /** Isbn */
      isbn: number;
      /** Title */
      title: string;
      /** Free Content */
      free_content?: string | null;
      /** Charged Content */
      charged_content?: string | null;
      /** Price */
      price: number;
      /** Files */
      files?: components['schemas']['FileDto'][] | null;
      /** Category */
      category: number;
    };
    /** FileDto */
    FileDto: {
      /** Name */
      name: string;
      /**
       * Url
       * Format: uri
       */
      url: string;
    };
    /** HTTPValidationError */
    HTTPValidationError: {
      /** Detail */
      detail?: components['schemas']['ValidationError'][];
    };
    /**
     * LANGUAGE
     * @enum {string}
     */
    LANGUAGE: 'kr' | 'us';
    /**
     * PROVIDER
     * @enum {string}
     */
    PROVIDER: 'kakao' | 'naver' | 'google' | 'facebook';
    /** Page[BasicDebateRes] */
    Page_BasicDebateRes_: {
      /** Items */
      items: components['schemas']['BasicDebateRes'][];
      /** Total */
      total: number | null;
      /** Page */
      page: number | null;
      /** Size */
      size: number | null;
      /** Pages */
      pages?: number | null;
    };
    /** Page[BasicFollowerSchema] */
    Page_BasicFollowerSchema_: {
      /** Items */
      items: components['schemas']['BasicFollowerSchema'][];
      /** Total */
      total: number | null;
      /** Page */
      page: number | null;
      /** Size */
      size: number | null;
      /** Pages */
      pages?: number | null;
    };
    /** Page[BasicFollowingSchema] */
    Page_BasicFollowingSchema_: {
      /** Items */
      items: components['schemas']['BasicFollowingSchema'][];
      /** Total */
      total: number | null;
      /** Page */
      page: number | null;
      /** Size */
      size: number | null;
      /** Pages */
      pages?: number | null;
    };
    /** Page[BasicMyBookRes] */
    Page_BasicMyBookRes_: {
      /** Items */
      items: components['schemas']['BasicMyBookRes'][];
      /** Total */
      total: number | null;
      /** Page */
      page: number | null;
      /** Size */
      size: number | null;
      /** Pages */
      pages?: number | null;
    };
    /** Page[BasicPostRes] */
    Page_BasicPostRes_: {
      /** Items */
      items: components['schemas']['BasicPostRes'][];
      /** Total */
      total: number | null;
      /** Page */
      page: number | null;
      /** Size */
      size: number | null;
      /** Pages */
      pages?: number | null;
    };
    /** Page[BasicSummaryRes] */
    Page_BasicSummaryRes_: {
      /** Items */
      items: components['schemas']['BasicSummaryRes'][];
      /** Total */
      total: number | null;
      /** Page */
      page: number | null;
      /** Size */
      size: number | null;
      /** Pages */
      pages?: number | null;
    };
    /** Page[PurchaseSchema] */
    Page_PurchaseSchema_: {
      /** Items */
      items: components['schemas']['PurchaseSchema'][];
      /** Total */
      total: number | null;
      /** Page */
      page: number | null;
      /** Size */
      size: number | null;
      /** Pages */
      pages?: number | null;
    };
    /**
     * PublicUserSchema
     * @description 다른 사람이 보는 프로필. 이메일·성별·생일 같은 개인정보는 넣지 않아요.
     */
    PublicUserSchema: {
      /** Id */
      id: number;
      /** Profile */
      profile?: string | null;
      /** Name */
      name?: string | null;
      /** Introduction */
      introduction?: string | null;
      /** Follower Num */
      follower_num: number;
      /** Following Num */
      following_num: number;
      /** @default USER */
      role: components['schemas']['ROLE'];
      /**
       * Created
       * Format: date-time
       */
      created: string;
      /**
       * Is Deleted
       * @default false
       */
      is_deleted: boolean;
    };
    /** PurchaseSchema */
    PurchaseSchema: {
      /** Id */
      id: number;
      /** User Id */
      user_id: number;
      /** Product Id */
      product_id: number;
      /**
       * Product Type
       * @enum {string}
       */
      product_type: 'D' | 'S';
      /** Content */
      content?: string | null;
      /** Price */
      price: number;
      /** Quantity */
      quantity: number;
      /** Order Id */
      order_id?: string | null;
      /**
       * Created
       * Format: date-time
       */
      created: string;
      /**
       * Updated
       * Format: date-time
       */
      updated: string;
      /** Is Deleted */
      is_deleted: boolean;
      /** Deleted At */
      deleted_at?: string | null;
    };
    /**
     * ROLE
     * @enum {string}
     */
    ROLE: 'ADMIN' | 'USER';
    /**
     * RegisterAgreementsReq
     * @description 가입할 때 받는 약관 동의. 이용약관과 개인정보 수집·이용 동의는 필수예요.
     */
    RegisterAgreementsReq: {
      /** Terms */
      terms: boolean;
      /** Privacy */
      privacy: boolean;
      /**
       * Marketing
       * @default false
       */
      marketing: boolean;
    };
    /** UpdateUserInfoReq */
    UpdateUserInfoReq: {
      /** Profile */
      profile?: string | null;
      /** Name */
      name?: string | null;
      /** Introduction */
      introduction?: string | null;
    };
    /**
     * UserSchema
     * @description 본인 정보 (/user/me, 로그인). 개인정보가 들어 있어서 본인에게만 줘요.
     */
    UserSchema: {
      /** Id */
      id: number;
      /**
       * Email
       * Format: email
       */
      email: string;
      /** Profile */
      profile?: string | null;
      /** Name */
      name?: string | null;
      /** Gender */
      gender?: boolean | null;
      /** Birthday */
      birthday?: string | null;
      /** Introduction */
      introduction?: string | null;
      /** Follower Num */
      follower_num: number;
      /** Following Num */
      following_num: number;
      /** @default USER */
      role: components['schemas']['ROLE'];
      /**
       * Created
       * Format: date-time
       */
      created: string;
      /**
       * Updated
       * Format: date-time
       */
      updated: string;
      /** Deleted At */
      deleted_at?: string | null;
      /**
       * Is Deleted
       * @default false
       */
      is_deleted: boolean;
    };
    /** ValidationError */
    ValidationError: {
      /** Location */
      loc: (string | number)[];
      /** Message */
      msg: string;
      /** Error Type */
      type: string;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
  getBooksController_books_get: {
    parameters: {
      query: {
        search: string;
        page?: number;
        size?: number;
        sortby?: 'latest' | 'popular';
        api_provider?: 'naver' | 'google';
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['BookAPIResponseSchema'];
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  getBookDetailController_book__isbn__get: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        isbn: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['BookAPIResponseSchema'];
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  chat_chatbot_post: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['ChatbotRequest'];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ChatbotResponse'];
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  getDebateListController_debate_get: {
    parameters: {
      query?: {
        category?: number;
        search?: string;
        searchby?: 'bt' | 'it';
        sortby?: 'latest' | 'popular' | 'from';
        from_?: string | null;
        /** @description Page number */
        page?: number;
        /** @description Page size */
        size?: number;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['Page_BasicDebateRes_'];
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  createDebateController_debate_post: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['CreateDebateReq'];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': number;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  getPopularDebateListController_debate_popular_get: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['BasicDebateRes'][];
        };
      };
    };
  };
  getDebateLikeController_debates_like_get: {
    parameters: {
      query?: {
        ids?: number[];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': number[];
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  getDebateCommentLikeController_debate_comments_like_get: {
    parameters: {
      query?: {
        debate_comment_ids?: number[];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': number[];
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  getDebateController_debate__debate_id__get: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        debate_id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['BasicDebateRes'];
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  updateDebateController_debate__debate_id__put: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        debate_id: number;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['CreateDebateReq'];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': unknown;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  deleteDebateController_debate__debate_id__delete: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        debate_id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': unknown;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  getDebateCommentsController_debate__debate_id__comments_get: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        debate_id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['BasicDebateComment'][];
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  createDebateCommentController_debate__debate_id__comment_post: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        debate_id: number;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['CreateDebateCommentReq'];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': number;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  createDebateLikeController_debate__debate_id__like_post: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        debate_id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': unknown;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  deleteDebateLikeController_debate__debate_id__like_delete: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        debate_id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': unknown;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  createDebateCommentLikeController_debate_comment__debate_comment_id__like_post: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        debate_comment_id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': unknown;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  deleteDebateCommentLikeController_debate_comment__debate_comment_id__like_delete: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        debate_comment_id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': unknown;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  deleteDebateCommentController_debate_comment__debate_comment_id__delete: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        debate_comment_id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': unknown;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  getFile_file_get: {
    parameters: {
      query: {
        url: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': unknown;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  uploadFile_file_post: {
    parameters: {
      query: {
        directory: 'debate' | 'post' | 'summary' | 'profile';
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        'multipart/form-data': components['schemas']['Body_uploadFile_file_post'];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['FileDto'];
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  isInLibraryController_librarys_is_in_library_get: {
    parameters: {
      query?: {
        ids?: number[] | null;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': number[];
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  addMyBookController_library__isbn__post: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        isbn: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': unknown;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  deleteMyBookController_library__isbn__delete: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        isbn: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': unknown;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  getPostListController_post_get: {
    parameters: {
      query?: {
        search?: string;
        sortby?: 'latest' | 'popular';
        /** @description Page number */
        page?: number;
        /** @description Page size */
        size?: number;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['Page_BasicPostRes_'];
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  createPostController_post_post: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['CreatePostReq'];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': number;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  getRecentPostsController_post_recent_get: {
    parameters: {
      query?: {
        /** @description Page number */
        page?: number;
        /** @description Page size */
        size?: number;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['Page_BasicPostRes_'];
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  getPostLikeController_posts_like_get: {
    parameters: {
      query?: {
        ids?: number[] | null;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': number[];
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  getPostCommentLikeController_post_comments_like_get: {
    parameters: {
      query?: {
        ids?: number[] | null;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': number[];
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  getPostController_post__post_id__get: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        post_id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['BasicPostRes'];
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  updatePostController_post__post_id__put: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        post_id: number;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['CreatePostReq'];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': unknown;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  deletePostController_post__post_id__delete: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        post_id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': unknown;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  getPostCommentsController_post__post_id__comments_get: {
    parameters: {
      query?: {
        size?: number;
        page?: number;
      };
      header?: never;
      path: {
        post_id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': unknown;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  createPostCommentController_post__post_id__comment_post: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        post_id: number;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['CreatePostCommentReq'];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': number;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  createPostLikeController_post__post_id__like_post: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        post_id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': unknown;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  deletePostLikeController_post__post_id__like_delete: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        post_id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': unknown;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  createPostCommentLikeController_post_comment__post_comment_id__like_post: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        post_comment_id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': unknown;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  deletePostCommentLikeController_post_comment__post_comment_id__like_delete: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        post_comment_id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': unknown;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  deletePostCommentController_post_comment__post_comment_id__delete: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        post_comment_id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': unknown;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  updatePostCommentController_post_comment__post_comment_id__patch: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        post_comment_id: number;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['CreatePostCommentReq'];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': unknown;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  getPurchaseController_purchase__product_type___product_id__get: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        product_type: 'D' | 'S';
        product_id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['PurchaseSchema'];
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  createPurchaseController_purchase_post: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['CreatePurchaseReq'];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': number;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  confirmPurchaseController_purchase_confirm_post: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['ConfirmPurchaseReq'];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': number;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  deletePurchaseController_purchase__purchase_id__delete: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        purchase_id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': unknown;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  getSummaryListController_summary_get: {
    parameters: {
      query?: {
        category?: number;
        search?: string;
        searchby?: 'bt' | 'it';
        sortby?: 'latest' | 'popular';
        lang?: components['schemas']['LANGUAGE'];
        /** @description Page number */
        page?: number;
        /** @description Page size */
        size?: number;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['Page_BasicSummaryRes_'];
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  createSummaryController_summary_post: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['CreateSummaryReq'];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': number;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  getPopularSummaryListController_summary_popular_get: {
    parameters: {
      query?: {
        lang?: components['schemas']['LANGUAGE'];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['BasicSummaryRes'][];
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  getSummaryLikeController_summarys_like_get: {
    parameters: {
      query?: {
        ids?: number[] | null;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': number[];
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  getSummaryCommentLikeController_summary_comments_like_get: {
    parameters: {
      query?: {
        summary_comment_ids?: number[] | null;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': number[];
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  getSummaryController_summary__summary_id__get: {
    parameters: {
      query?: {
        lang?: components['schemas']['LANGUAGE'];
      };
      header?: never;
      path: {
        summary_id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['BasicSummaryRes'];
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  updateSummaryController_summary__summary_id__put: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        summary_id: number;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['CreateSummaryReq'];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': unknown;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  deleteSummaryController_summary__summary_id__delete: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        summary_id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': unknown;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  getSummaryChargedContentController_summary__summary_id__charged_content_get: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        summary_id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': string;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  getSummaryCommentController_summary__summary_id__comments_get: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        summary_id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['BasicSummaryComment'][];
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  createSummaryCommentController_summary__summary_id__comment_post: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        summary_id: number;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['CreateSummaryCommentReq'];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': number;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  createSummaryLikeController_summary__summary_id__like_post: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        summary_id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': unknown;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  deleteSummaryLikeController_summary__summary_id__like_delete: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        summary_id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': unknown;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  createSummaryCommentLikeController_summary_comment__summary_comment_id__like_post: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        summary_comment_id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': unknown;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  deleteSummaryCommentLikeController_summary_comment__summary_comment_id__like_delete: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        summary_comment_id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': unknown;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  deleteSummaryCommentController_summary_comment__summary_comment_id__delete: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        summary_comment_id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': unknown;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  getMyInfoController_user_me_get: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['UserSchema'];
        };
      };
    };
  };
  deleteUserController_user_me_delete: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': unknown;
        };
      };
    };
  };
  updateUserInfoController_user_me_patch: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['UpdateUserInfoReq'];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['UserSchema'];
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  getPurchasesController_user_purchase_get: {
    parameters: {
      query: {
        _from: string;
        _to: string;
        /** @description Page size */
        size?: number;
        /** @description Page number */
        page?: number;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['Page_PurchaseSchema_'];
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  getUserInfoController_user__user_id__get: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        user_id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['PublicUserSchema'];
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  getUserPostsController_user__user_id__posts_get: {
    parameters: {
      query?: {
        /** @description Page number */
        page?: number;
        /** @description Page size */
        size?: number;
      };
      header?: never;
      path: {
        user_id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['Page_BasicPostRes_'];
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  getUserSummariesController_user__user_id__summaries_get: {
    parameters: {
      query?: {
        lang?: components['schemas']['LANGUAGE'];
        /** @description Page number */
        page?: number;
        /** @description Page size */
        size?: number;
      };
      header?: never;
      path: {
        user_id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['Page_BasicSummaryRes_'];
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  getMyBooksController_user__user_id__mybooks_get: {
    parameters: {
      query?: {
        /** @description Page number */
        page?: number;
        /** @description Page size */
        size?: number;
      };
      header?: never;
      path: {
        user_id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['Page_BasicMyBookRes_'];
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  getPurchasedSummariesController_user__user_id__purchased_summaries_get: {
    parameters: {
      query?: {
        lang?: components['schemas']['LANGUAGE'];
        /** @description Page number */
        page?: number;
        /** @description Page size */
        size?: number;
      };
      header?: never;
      path: {
        user_id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['Page_BasicSummaryRes_'];
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  getUserDebatesController_user__user_id__debates_get: {
    parameters: {
      query?: {
        /** @description Page number */
        page?: number;
        /** @description Page size */
        size?: number;
      };
      header?: never;
      path: {
        user_id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['Page_BasicDebateRes_'];
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  getPurchasedDebatesController_user__user_id__purchased_debates_get: {
    parameters: {
      query?: {
        /** @description Page number */
        page?: number;
        /** @description Page size */
        size?: number;
      };
      header?: never;
      path: {
        user_id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['Page_BasicDebateRes_'];
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  getFollowersController_user__user_id__followers_get: {
    parameters: {
      query?: {
        /** @description Page number */
        page?: number;
        /** @description Page size */
        size?: number;
      };
      header?: never;
      path: {
        user_id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['Page_BasicFollowerSchema_'];
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  getFollowersController_user__user_id__followings_get: {
    parameters: {
      query?: {
        /** @description Page number */
        page?: number;
        /** @description Page size */
        size?: number;
      };
      header?: never;
      path: {
        user_id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['Page_BasicFollowingSchema_'];
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  isFollowingController_user_is_following__target_user_id__get: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        target_user_id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': boolean;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  restoreUserController_user_restore_post: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': unknown;
        };
      };
    };
  };
  basicRegisterController_user_register_post: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['BasicRegisterReq'];
      };
    };
    responses: {
      /** @description Successful Response */
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': number;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  basicLoginController_user_login_post: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['BasicLoginReq'];
      };
    };
    responses: {
      /** @description Successful Response */
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': unknown;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  refreshAccessToken_user_access_token_post: {
    parameters: {
      query: {
        refresh_token: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': unknown;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  followUserController_user_follow__target_user_id__post: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        target_user_id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': unknown;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  unfollowUserController_user_follow__target_user_id__delete: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        target_user_id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': unknown;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  deleteUserProfileController_user_profile_delete: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': unknown;
        };
      };
    };
  };
  oAuthRegisterController_oauth__provider__get: {
    parameters: {
      query: {
        code: string;
        redirect_uri: string;
        state?: string | null;
      };
      header?: never;
      path: {
        provider: components['schemas']['PROVIDER'];
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['UserSchema'];
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
}
