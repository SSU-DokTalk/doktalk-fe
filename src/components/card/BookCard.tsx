import { BookType } from "@/types/data";
import Image from "@/components/base/Image";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { updateGlobalState } from "@/stores/globalStates";
import { useAppDispatch } from "@/stores/hooks";

function BookCard({
  idx,
  book,
  isInLibrary,
  setIsInLibrary,
}: {
  idx: number;
  book: BookType;
  isInLibrary: boolean;
  setIsInLibrary: React.Dispatch<React.SetStateAction<boolean[]>>;
}) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const addToLibrary = () => {
    axios.post(`/api/library/${book.isbn}`).then(
      () => {
        setIsInLibrary((prv) =>
          prv
            .slice(0, idx)
            .concat(true)
            .concat(prv.slice(idx + 1))
        );
        book.in_library_num++;
        dispatch(updateGlobalState({ isLibraryUpdated: true }));
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const removeFromLibrary = () => {
    axios.delete(`/api/library/${book.isbn}`).then(
      () => {
        setIsInLibrary((prv) =>
          prv
            .slice(0, idx)
            .concat(false)
            .concat(prv.slice(idx + 1))
        );
        book.in_library_num--;
        dispatch(updateGlobalState({ isLibraryUpdated: true }));
      },
      (err) => {
        console.log(err);
      }
    );
  };

  return (
    <div id='book-card' className='flex flex-col! items-start! md:flex-row!'>
      <div className='flex flex-row!'>
        <div className='image-container'>
          <Image src={book.image} className='w-24 h-40 md:w-35 md:h-43' />
        </div>
        <div className='content-container'>
          <div className='title'>{book.title}</div>
          <div className='info-container'>
            <div className='author'>
              {book.author.split("^").length > 2
                ? `${book.author.split("^").slice(0, 2).join(", ")} 외 ${
                    book.author.split("^").slice(2).length
                  }명`
                : `${book.author.split("^").slice(0, 2)}`}
            </div>
            <div className='publisher'>{book.publisher}</div>
            <div className='pubdate'>{`${book.pubdate.slice(
              0,
              4
            )}/${book.pubdate.slice(4, 6)}/${book.pubdate.slice(6, 8)}`}</div>
          </div>
          <div className='description'>
            {book.description?.replace("\n", " ")}
          </div>
        </div>
      </div>

      {/* TODO: 현재 bootstrap을 완전히 제거하지 않아 bootstrap.css의 flex-row가 적용되면 정상동작하지 않아 ! 필요 (.flex-row {flex-direction: row !important;})) */}
      <div className='button-container flex flex-row! md:flex-col!'>
        <button
          className='to-my-book my-1 mr-1 md:ml-1!'
          onClick={isInLibrary ? removeFromLibrary : addToLibrary}>
          {isInLibrary
            ? t("component.card.book.button.remove-from-library")
            : t("component.card.book.button.add-to-library")}
        </button>
        <button className='look-summary m-1!'>
          {`${t("component.card.book.button.in-library-num")} ${
            book.in_library_num
          }`}
          {}
        </button>
      </div>
    </div>
  );
}

export default BookCard;
