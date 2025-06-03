
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next'
import { Div, Text, Skeleton, Button, Icon, Input ,Modal} from 'react-native-magnus'
import { api_config } from '../../../config/api_config';
import { useFormik } from 'formik';
import Custom_button from '../../../Custom_Components/Custom_button';





function renderStars(rating) {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <Text key={i} color={i <= rating ? "yellow600" : "gray400"} fontSize={18}>
                ★
            </Text>
        );
    }
    return stars;
}



function StarSelector({ value, onChange }) {
    return (
        <Div row>
            {[1, 2, 3, 4, 5].map((i) => (
                <Text
                    key={i}
                    fontSize={28}
                    color={i <= value ? "yellow600" : "gray400"}
                    onPress={() => onChange(i)}
                    style={{ marginRight: 4 }}
                >
                    ★
                </Text>
            ))}
        </Div>
    );
}





export default function Product_review({ product }) {
    const { t } = useTranslation();
    const [reviews, setReviews] = useState(null)
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false)

    const fetch_product_reviews = async () => {
        try {
            const res = await axios.get(`${api_config.url}/api/reviews?filter[product_id][$eq]==${product?.id}`, {
                headers: {
                    Authorization: `Bearer ${api_config.token}`,
                }
            })
            setReviews(res.data?.data?.length ? res.data.data : []);
        } catch (error) {
            setReviews([]);
        }
    }

    useEffect(() => {
        fetch_product_reviews()
    }, [product?.id])





    // add review section
    // add review section
    const formik = useFormik({
        initialValues: {
            comment: '',
            rating: 0
        },
        enableReinitialize: true,
        onSubmit: async (values, { resetForm }) => {
            setLoading(true)
            try {
                await axios.post(
                    `${api_config.url}/api/reviews`,
                    {
                        data: {
                            comment: values.comment,
                            rating: values.rating,
                            product_id: product?.id
                        }
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${api_config.token}`
                        }
                    }
                );
                setVisible(false);
                fetch_product_reviews();
                resetForm();
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.log(error);
            } finally {
                setLoading(false)
            }
        }
    });















    return (
        <Div px={5} py={10} bg="white">
            <Text fontWeight="bold" fontSize={18} mb={10}>
                {t('reviews')}
            </Text>




            <Custom_button title={t('add-review')} onPress={() => setVisible(true)} />

            {reviews === null ? (
                // Skeleton loader
                <>
                    {[1, 2].map((i) => (
                        <Div key={i} mb={15}>
                            <Skeleton h={20} w={120} mb={5} />
                            <Skeleton h={15} w={200} />
                        </Div>
                    ))}
                </>
            ) : reviews.length === 0 ? (
                <Div alignItems="center" py={20}>
                    <Text color="gray500">{t('no-reviews')}</Text>
                </Div>
            ) : (
                reviews.map((review) => (
                    <Div
                        key={review.id}
                        bg="white"
                        rounded="lg"

                        p={15}
                        mb={10}
                        borderWidth={1}
                        borderColor="gray200"
                    >
                        <Div row mb={5} alignItems="center">
                            {renderStars(review.rating)}
                            <Text ml={10} color="gray500" fontSize={12}>
                                {new Date(review.createdAt).toLocaleDateString()}
                            </Text>
                        </Div>
                        <Text color="gray800" fontSize={13}>
                            {review.comment}
                        </Text>
                    </Div>
                ))
            )}









            <Modal isVisible={visible} h={340} animationOutTiming={500} animationInTiming={500}>
                <Button
                    bg="gray400"
                    h={35}
                    w={35}
                    position="absolute"
                    top={10}
                    right={15}
                    p={0}
                    rounded="circle"
                    onPress={() => {
                        setVisible(false);
                        formik.resetForm();
                    }}
                >
                    <Icon color="black900" name="close" />
                </Button>
                <Div p={20} mt={40}>
                    <Text fontWeight="bold" fontSize={18} mb={10}>
                        {t('add-review')}
                    </Text>
                    <StarSelector
                        value={formik.values.rating}
                        onChange={(val) => formik.setFieldValue('rating', val)}
                    />
                    <Div mt={15}>

                        <Input
                            placeholder={t('write-review')}
                            value={formik.values.comment}
                            onChangeText={formik.handleChange('comment')}

                        />
                    </Div>

                    <Custom_button title={t('Submit')} onPress={formik.handleSubmit} disabled={formik.values.rating === 0 || !formik.values.comment} />
                </Div>
            </Modal>











        </Div>
    )
}