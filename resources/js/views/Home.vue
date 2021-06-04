<template>
    <v-container>
        <v-row>
            <v-col class="text-center">
                <span class="h3">
                    การคัดเลือกบุคคลที่จะเข้ารับการประเมินผลงานเพื่อแต่งตั้ง (เลื่อน) <br>
                ให้ดำรงตำแหน่งประเภทวิชาการระดับชำนาญการพิเศษ
                </span>


            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card>
                <v-tabs
                    v-model="tab"
                    background-color="indigo darken-4"
                    start
                    icons-and-text
                    grow
                    dark
                >
                <v-tabs-slider color="blue"></v-tabs-slider>
                    <v-tab :href="'#tab-' + index" v-for="(tab,index) in my_tabs" :key="index">
                        {{tab.name}}
                        <v-icon>{{tab.icon}}</v-icon>
                    </v-tab>

                </v-tabs>
                <v-tabs-items v-model="tab">
                    <v-tab-item
                        value="tab-0"
                    >

                            <employee-data></employee-data>

                    </v-tab-item>
                </v-tabs-items>
                <v-tabs-items v-model="tab">
                    <v-tab-item
                        value="tab-1"
                    >
                            <select-position></select-position>

                    </v-tab-item>
                </v-tabs-items>
                <v-tabs-items v-model="tab">
                    <v-tab-item
                        value="tab-2"
                    >

                        <attach-document></attach-document>

                    </v-tab-item>
                </v-tabs-items>
                <v-tabs-items v-model="tab">
                    <v-tab-item
                        value="tab-3"
                    >
                    <v-card
                        class="pa-5"
                    >
                        <v-row>
                            <v-col cols="3">ชื่อ - นามสกุล :</v-col>
                            <v-col></v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="3">ตำแหน่ง :</v-col>
                            <v-col></v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="3">สังกัด :</v-col>
                            <v-col></v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="3">ตำแหน่งที่เลือก :</v-col>
                            <v-col></v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="3">เอกสารแนบ :</v-col>
                            <v-col></v-col>
                        </v-row>
                        <v-row justify="center">
                            <v-col>
                                <v-checkbox
                                    class="text-center"
                                    :label="`ยืนยันความถูกต้องของข้อมูล`"
                                ></v-checkbox>
                            </v-col>
                        </v-row>
                        <v-row justify="center">
                            <v-col class="text-center">
                                <v-btn
                                    color="success"
                                    dark
                                >
                                    <v-icon left class="mr-2">
                                        mdi-send
                                    </v-icon>
                                    ส่งข้อมูล
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card>


                    </v-tab-item>
                </v-tabs-items>
                </v-card>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col cols="10">

            </v-col>
        </v-row>
        <v-row>
            <v-col>

            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data(){
        return {
            tab: null,
            my_tabs: [
                {
                    name : "ข้อมูลผู้สมัคร",
                    icon : "mdi-account-circle",
                },
                {
                    name : "เลือกตำแหน่ง",
                    icon : "mdi-clipboard-list"
                },
                {
                    name : "แนบเอกสาร",
                    icon : "mdi-paperclip"
                },
                {
                    name : "สรุปข้อมูล",
                    icon : "mdi-send"
                }

            ],

        }
    },
    watch: {

    }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}
</style>
