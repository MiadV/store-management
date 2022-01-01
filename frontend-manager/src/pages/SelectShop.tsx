import React from "react";
import { Box, Stack, Text } from "@chakra-ui/react";
import Header from "../components/Header";
import PageLayout from "../layouts/PageLayout";
import useAuth, { ShopType } from "../hooks/useAuth";
import SelectStoreItem from "../components/SelectStoreItem";
import NoOptionsCard from "../components/NoOptionsCard";
import { useNavigate } from "react-router-dom";

const SelectShop = () => {
    const { data: authUser } = useAuth();

    return (
        <PageLayout>
            <Header
                title={`Hello, ${authUser!.name}`}
                showSelectStore={false}
            />
            <Box padding={6}>
                <Text>Please select your current store</Text>

                {authUser && authUser.shops.length > 0 ? (
                    <RenderShopItems shopsArray={authUser.shops} />
                ) : (
                    <NoOptionsCard
                        title="No stores!"
                        subtitle="There are no stores assinged to you."
                    />
                )}
            </Box>
        </PageLayout>
    );
};

export default SelectShop;

const RenderShopItems: React.FC<{ shopsArray: ShopType[] }> = (props) => {
    const { shopsArray } = props;
    let navigate = useNavigate();

    const storeItems = shopsArray.map((item) => (
        <SelectStoreItem
            shopTitle={item.title}
            key={item.shopId}
            callback={() => navigate(`/store/${item.shopId}`)}
        />
    ));

    return (
        <Stack spacing={4} marginTop={4}>
            {storeItems}
        </Stack>
    );
};
