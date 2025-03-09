import { ACCEPTABLE_FILE } from '@/common/variables'
import { getFileTypeFromUrl } from '@/functions'
import React, {
    Dispatch,
    JSXElementConstructor,
    ReactElement,
    SetStateAction,
    useRef,
    useState,
} from 'react'
import Chain from '@/assets/images/chain.svg'

/**
 * 파일 업로드 버튼
 * @description #upload-file로 스타일 적용
 * @param children - 업로드 버튼을 대체할 컴포넌트(Custom Button)
 * @param setFile - 파일을 저장할 state를 설정하는 함수
 * @param maxSize - 업로드 가능한 파일 최대 크기
 * @param accept - 업로드 가능한 파일 형식(comma separated)
 * @param hasTooLargeFile - 파일이 너무 큰지 저장할 state
 * @param setHasTooLargeFile - 파일이 너무 큰지 저장할 state를 설정하는 함수
 * @param hasUnacceptableFile - 업로드 불가능한 파일 형식인지 저장할 state
 * @param setHasUnacceptableFile - 업로드 불가능한 파일 형식인지 저장할 state를 설정하는 함수
 */

function UploadFile({
    children,
    setFile,
    maxSize = 10 * 1024 * 1024,
    accept = ACCEPTABLE_FILE.join(),
    hasTooLargeFile,
    setHasTooLargeFile,
    hasUnacceptableFile,
    setHasUnacceptableFile,
}: {
    children?: ReactElement<any, string | JSXElementConstructor<any>>
    setFile: Dispatch<SetStateAction<File | null>>
    maxSize?: number
    accept?: string
    hasTooLargeFile?: boolean
    setHasTooLargeFile?: Dispatch<SetStateAction<boolean>>
    hasUnacceptableFile?: boolean
    setHasUnacceptableFile?: Dispatch<SetStateAction<boolean>>
}) {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [inherentHasTooLargeFile, setInherentHasTooLargeFile] =
        useState<boolean>(false)
    const [inherentHasUnacceptableFile, setInherentHasUnacceptableFile] =
        useState<boolean>(false)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        ;(setHasTooLargeFile ?? setInherentHasTooLargeFile)(false)
        ;(setHasUnacceptableFile ?? setInherentHasUnacceptableFile)(false)
        let file = e.target.files?.[0]

        if (!file) return

        if (file.size > maxSize) {
            ;(setHasTooLargeFile ?? setInherentHasTooLargeFile)(true)
            return
        }

        if (
            !accept
                .split(',')
                .reduce<string[]>((acc, cur) => acc.concat(cur.trim()), [])
                .includes(`.${getFileTypeFromUrl(file.name)}`)
        ) {
            ;(setHasUnacceptableFile ?? setInherentHasUnacceptableFile)(true)
            return
        }

        setFile(file)
    }

    return (
        <div id='upload-file'>
            <input
                type='file'
                accept={accept}
                ref={inputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            <div className='error-message' style={{ color: 'red' }}>
                {!hasTooLargeFile &&
                    inherentHasTooLargeFile &&
                    `파일은 최대 ${Math.trunc(
                        maxSize / 1024 / 1024
                    )}MB까지만 업로드 가능합니다`}
                {!hasUnacceptableFile &&
                    inherentHasUnacceptableFile &&
                    `파일은 ${accept
                        .split(',')
                        .reduce<string[]>(
                            (acc, cur) => acc.concat(cur.trim()),
                            []
                        )
                        .join(', ')} 형식만 업로드 가능합니다`}
            </div>
            {children ? (
                React.cloneElement(children, {
                    onClick: () => inputRef.current?.click(),
                })
            ) : (
                <button
                    className='upload-button'
                    onClick={() => inputRef.current?.click()}
                >
                    <span>파일 첨부</span> <img src={Chain} alt='attach file' />
                </button>
            )}
        </div>
    )
}

export default UploadFile
