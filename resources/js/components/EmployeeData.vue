<template>
    <v-card elevation="3" class="pa-5">
        <v-row>
            <v-col>
                <v-icon>
                    mdi-account-circle
                </v-icon> ข้อมูลผู้สมัคร</v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-form>
                    <v-card elevation="0">
                    <v-row>
                        <v-col cols="3">
                            <v-text-field
                                label="คำนำหน้า"
                                outlined
                                dense
                            ></v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field
                                label="ชื่อ"
                                outlined
                                dense
                            ></v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field
                                label="นามสกุล"
                                outlined
                                dense
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field
                                label="ตำแหน่งปัจจุบัน"
                                outlined
                                dense
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                label="กลุ่มงาน"
                                outlined
                                dense
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="3">
                            <v-select
                                v-model="org_type"
                                :items="org_type_list"
                                item-text="text"
                                item-value="value"
                                label="ประเภทหน่วยงาน"
                                outlined
                                dense
                            ></v-select>
                        </v-col>
                        <v-col cols="5">
                            <v-select
                                v-if="org_type"
                                v-model="org"
                                :items="org_list"
                                item-text="text"
                                item-value="text"
                                label="ชื่อหน่วยงาน"
                                outlined
                                dense
                            ></v-select>

                        </v-col>
                    </v-row>
                    <v-divider></v-divider>

                    <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                        color="success"
                        outlined

                    >
                        บันทึก
                    </v-btn>
                    <v-btn
                        color="red"
                        text

                    >
                        ยกเลิก
                    </v-btn>
                    </v-card-actions>
                    </v-card>

                </v-form>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
export default {
    data(){
        return {
            org_type: null,
            org_type_list: [
                {text: 'ส่วนกลาง',value: 1},
                {text: 'คลังเขต',value: 2},
                {text: 'คลังจังหวัด',value: 3},
            ],
            org: null,
            org_list_all:[
                {text: 'กองบัญชีภาครัฐ 1', value: 1 ,type: 1},
                {text: 'กองบัญชีภาครัฐ 2', value: 2, type: 1},
                {text: 'กองบัญชีภาครัฐ 3', value: 3, type: 1},
                {text: 'คลังเขต 1', value: 4, type: 2},
                {text: 'คลังจังหวัด 1', value: 5, type: 3},
            ],
            org_list: []
        }
    },
    watch: {
        org_type(){
            if (this.org_type){
                this.org = null;
                this.org_list = this.org_list_all.filter(x=>x.type == this.org_type);
            }
        }
    }
}
</script>

<style scoped>
hr{
    margin-top: 2px!important;
    margin-bottom: 2px!important;
}
</style>
