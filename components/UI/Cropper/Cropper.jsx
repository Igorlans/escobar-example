import React, {useState} from 'react';
import classes from "./cropper.module.scss";
import Image from "next/image";
import FileUploader from "@/components/UI/FileUploader/FileUploader";
import CropDialog from "./CropDialog/CropDialog";
import {IoMdClose} from "react-icons/io";

const Cropper = ({file, setFile, width = 290, height = 290, placeholder = '/image_uploader_plus.svg'}) => {
	const [image, setImage] = useState(file || null);
	const [selectedImage, setSelectedImage] = useState(null);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const handleFileUpload = (file) => {
		// const imageUrl = URL.createObjectURL(file);
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			setSelectedImage(reader.result);
		};
		setIsModalVisible(true);
	}

	return (
		<div style={{alignSelf: 'flex-start'}}>
			{isModalVisible &&
				<CropDialog
					selectedImage={selectedImage}
					setSelectedImage={setSelectedImage}
					setFile={setFile}
					isVisible={isModalVisible}
					setIsVisible={setIsModalVisible}
					setNewImage={setImage}
				/>
			}
			{image
				?
				<div
					className={classes.uploadImage}
					onClick={() => {
						setIsModalVisible(true)
						// setSelectedImage(image)
					}}
				>
					<div className={classes.overlay}>
					</div>
					<Image src={image || selectedImage} alt={'uploader'} width={width} height={height} />
					<div
						className={classes.close}
						onClick={(e) => {
							e.stopPropagation()
							setImage(null)
							setFile(null)
						}}
					>
						<IoMdClose size={width > 200 ? '30px' : '20px'} />
					</div>
				</div>
				:
				<FileUploader style={{width: width, height: height}} className={classes.uploadImage} handleFile={handleFileUpload}>
					<Image style={{objectFit: 'cover'}} src={placeholder} alt={'uploader'} width={width} height={height} />
				</FileUploader>
			}
		</div>
	);
};

export default Cropper;