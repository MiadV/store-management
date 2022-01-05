import React from "react";
import { Box, Stack, Text } from "@chakra-ui/react";
import Header from "../components/Header";
import PageLayout from "../layouts/PageLayout";
import useAuth from "../hooks/useAuth";
import SelectStoreItem from "../components/SelectStoreItem";
import NoOptionsCard from "../components/NoOptionsCard";
import { ShopType } from "../types";
import { useSelectedStore } from "../context/selectedStoreContext";
import { useNavigate } from "react-router-dom";

const SelectShop = () => {
    const { data: authUser } = useAuth();
    const { setSelectedStore } = useSelectedStore();
    const navigate = useNavigate();

    function handleSelectedStore(storeId: string | number) {
        const selected = authUser!.shops.find((i) => i.shopId === storeId);

        if (selected) {
            setSelectedStore(selected);
            navigate(`/store-dashboard`);
        } else {
            setSelectedStore(null);
        }
    }

    return (
        <PageLayout>
            <Header
                title={`Hello, ${authUser!.name}`}
                showSelectStore={false}
            />
            <Box padding={6}>
                <Text>Please select your current store</Text>

                {authUser && authUser.shops.length > 0 ? (
                    <RenderShopItems
                        shopsArray={authUser.shops}
                        callback={handleSelectedStore}
                    />
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

const RenderShopItems: React.FC<{
    shopsArray: ShopType[];
    callback: (storeId: string | number) => void;
}> = (props) => {
    const { shopsArray, callback } = props;

    const storeItems = shopsArray.map((item) => (
        <SelectStoreItem key={item.shopId} store={item} callback={callback} />
    ));

    return (
        <Stack spacing={4} marginTop={4}>
            {storeItems}
        </Stack>
    );
};
