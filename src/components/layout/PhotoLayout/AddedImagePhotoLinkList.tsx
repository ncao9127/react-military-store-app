import Image from "next/image";
import React, {useEffect, useState} from "react";
import {DeleteIcon} from "@/components/icons/DeleteIcon";
import {EditIcon} from "@/components/icons/EditIcon";

export default function AddedImagePhotoLinkList(
    {photoLink, image, setPhotoLink, setIsFormValid, setImage}:
        {
            image: string[],
            photoLink: string,
            setPhotoLink: any,
            setIsFormValid: any,
            setImage: any
        }
) {

    const [imagePhotoLink, setImagePhotoLink] = useState(image[0] || '');
    const [errors, setErrors] = useState({photoLink: '',});
    const [inputFocused, setInputFocused] = useState('');
    const [numInputs, setNumInputs] = useState(image.length);
    const [photoIndex, setPhotoIndex] = useState(0);

    useEffect(() => {
        setNumInputs(image.length)
    }, [image.length]);

    useEffect(() => {
        setImagePhotoLink(image[0] || '')
    }, [photoLink]);

    const handleInputFocus = (fieldName: string) => {
        setInputFocused(fieldName);
        setErrors(prev => ({...prev, [fieldName]: ''}));
    };

    const handleInputBlur = () => {
        setInputFocused('');
        validateForm();
    };

    const validateForm = () => {
        const newErrors = {...errors}

        if (inputFocused === 'photoLink' && photoLink.trim() !== '') {
            if (!/^https:.+/.test(photoLink)) {
                newErrors.photoLink = 'photoLink is invalid.';
            }
        }

        setErrors(newErrors);
        setIsFormValid(!!newErrors.photoLink);
    };

    const clearPhotoLink = (index: number) => {
        const updatedImage = [...image];
        updatedImage[index] = '';
        setImage(updatedImage);
    }

    const handleAddInput = () => {
        setNumInputs(prevNumInputs => prevNumInputs + 1);
        setImage((prevImage: any) => [...prevImage, ""]);
    };

    const handleRemoveInput = () => {
        setNumInputs(prevNumInputs => Math.max(1, prevNumInputs - 1)); // Не дозволяємо видалення всіх полів
        setImage((prevImage: any) => prevImage.slice(0, -1)); // Видаляємо останній рядок з масиву
    };

    const handleInputChange = (index: number, value: any) => {
        const updatedImage = [...image];
        updatedImage[index] = value;
        setImage(updatedImage);
    };

    return (
        <div className="bg-gray-100 p-2 rounded-2xl items-center my-auto">
            <div className="flex gap-1">
                <div>
                    <Image src={image[photoIndex] || '/pizza.png'} alt={"avatar"} width={250} height={250}
                           className="rounded-xl w-full h-full mb-1 aspect-square object-cover"/>
                </div>
            </div>

            <button
                type="button"
                onClick={() => setPhotoIndex(photoIndex <= image.length? photoIndex + 1: 0)}>
                +
            </button>
            <button
                type="button"
                onClick={() => setPhotoIndex(photoIndex - 1)}>
                -
            </button>
            <div>
                {errors.photoLink && <p className="text-red-500 -mb-4">{errors.photoLink}</p>}
                <div className="grid grid-cols-1 items-end gap-1">
                    <div>
                        <label>Photo link</label>
                        <div>
                            {[...Array(numInputs)].map((_, index) => (
                                <div className="flex gap-1 items-center justify-center">
                                    <input
                                        key={index}
                                        type="text"
                                        value={image[index] || ""}
                                        onFocus={() => handleInputFocus('photoLink')}
                                        onBlur={handleInputBlur}
                                        onChange={e => handleInputChange(index, e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="delete flex items-center justify-center gap-1"
                                        onClick={() => clearPhotoLink(index)}>
                                        Delete <DeleteIcon className="h-5 w-5"/>
                                    </button>
                                </div>
                            ))}
                            <button onClick={handleAddInput}>Додати поле вводу</button>
                            <button onClick={handleRemoveInput}>Видалити останнє поле вводу</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}