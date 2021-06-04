<template>
  <v-row>
      <v-col cols="3">
          <v-list
            class="ml-2"
            flat
            subheader

        >
              <v-subheader>
                    <v-icon
                        color="primary darken-4"
                        class="mr-2"

                    >
                        mdi-view-list
                    </v-icon>
                ชื่อตำแหน่ง
                </v-subheader>
                <v-divider></v-divider>
                <template v-for="(item,index) in tree" >


                <v-list-item
                    :key="item.text"
                    @click="selectPosition(index)"
                >
                    <!-- <v-list-item-icon>
                    <v-icon
                        v-if="item.icon"
                        color="pink"
                    >
                        mdi-star
                    </v-icon>
                    </v-list-item-icon> -->

                    <v-list-item-content>
                    <v-list-item-title v-text="item.text"></v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-action>
                        <v-btn
                            fab
                            x-small
                            depressed
                            color="primary"
                        >
                            {{item.children.length}}
                        </v-btn>

                    </v-list-item-action>
                </v-list-item>
                <v-divider
                    v-if="index < tree.length - 1"
                    :key="index"
                ></v-divider>
            </template>
        </v-list>
          <!-- <div v-for="(item,index) in tree" :key="index">
                <v-chip
                    class="ma-2 position"
                    color="success"

                    filter
                     @click="selectPosition(index)">{{item.text}}
                </v-chip>
        </div> -->

      </v-col>
      <v-col cols="4">

              <v-list
                flat
                subheader
                elevation="2"
            >

                <v-list-item-group


                    active-class=""
                    multiple
                >
                    <v-subheader>
                        <v-icon
                            color="primary darken-4"
                            class="mr-2"

                        >
                            mdi-format-list-bulleted-square
                        </v-icon>
                        ตำแหน่งว่าง : {{(select_position) ? select_position : ''}}
                    </v-subheader>
                    <v-divider></v-divider>
                    <!-- <template v-for="(item, index) in children_list"> -->
                    <v-virtual-scroll
                        :items="children_list"
                        :item-height="75"
                        :search="search"
                        height="500"
                        >
                        <template v-slot:default="{ item,index }">

                        <v-list-item @click="selectEmptyPosition(item.position_no)">

                        <v-list-item-content>
                            <v-list-item-title >
                                <span class="empty-title">{{item.org_name}}</span>

                            </v-list-item-title>

                            <v-list-item-subtitle

                            >
                            <span class="subtitle">{{item.group_name}}</span><br>
                            <span class="subtitle2">{{'เลขที่ตำแหน่ง ' + item.position_no}}</span>
                            </v-list-item-subtitle>


                        </v-list-item-content>

                        <v-list-item-action>
                            <!-- <v-list-item-action-text v-text="'เลขที่ ' + item.position_no"></v-list-item-action-text> -->



                            <v-icon
                                v-if="checkIsSelected(item.position_no) >= 0"
                                color="green accent-4"
                                >
                                mdi-checkbox-marked-circle
                            </v-icon>
                            <v-icon
                                v-else
                                color="grey lighten-3"
                                >
                                mdi-checkbox-marked-circle
                            </v-icon>
                        </v-list-item-action>

                    </v-list-item>

                    <v-divider
                        v-if="index < children_list.length - 1"
                        :key="index"
                    ></v-divider>
                    </template>
                    </v-virtual-scroll>
                </v-list-item-group>
                </v-list>
                <!-- <div v-for="(item,index) in children_list" :key="index">
                  <v-chip
                    class="ma-2 empty_position"
                    color="primary"
                    filter
                    >

                    <span>{{item.org_name}}</span>
                    <v-spacer></v-spacer>
                    <v-chip
                        small
                        class="pa-1 text-right"
                        color="light"
                    >
                        {{item.position_no}}
                    </v-chip>
                    </v-chip>
                </div> -->


      </v-col>
      <v-col cols="5">

          <v-list
                flat
                class="mr-2"
                subheader
                elevation="2"

            >

                <v-list-item-group
                    active-class=""

                >
                    <v-subheader>
                        <v-icon
                            color="primary darken-4"
                            class="mr-2"
                        >
                            mdi-clipboard-list
                        </v-icon>
                        ตำแหน่งที่เลือก : {{(selected.length > 0) ? selected.length : ''}} ตำแหน่ง
                        <v-spacer></v-spacer>
                        <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    v-bind="attrs"
                                    v-on="on"
                                    x-small
                                    fab
                                    color="primary"
                                    dark
                                    class="mr-2"
                                >
                                <v-icon>
                                    mdi-pencil
                                </v-icon>
                                </v-btn>

                            </template>
                            <span>แก้ไขข้อมูล</span>
                        </v-tooltip>
                        <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    v-bind="attrs"
                                    v-on="on"
                                    x-small
                                    fab
                                    color="success"
                                    dark
                                    class="mr-2"
                                >
                                <v-icon>
                                    mdi-content-save
                                </v-icon>
                                </v-btn>

                            </template>
                            <span>บันทึกข้อมูล</span>
                        </v-tooltip>
                        <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    :disabled="!selected || selected.length==0"
                                    v-bind="attrs"
                                    v-on="on"
                                    x-small
                                    fab
                                    color="red"
                                    outlined
                                    @click="selected=[]"
                                >
                                <v-icon>
                                    mdi-delete-forever
                                </v-icon>
                                </v-btn>
                            </template>
                            <span>ลบทั้งหมด</span>
                        </v-tooltip>

                        </v-subheader>
                        <v-divider></v-divider>
                    <!-- <template v-for="(item, index) in children_list"> -->
                    <v-virtual-scroll
                        :items="selected"
                        :item-height="75"

                        height="500"
                        >
                        <template v-slot:default="{ item,index }">

                        <v-list-item>
                            <v-list-item-action class="order">

                            <v-chip
                                small
                                class="pa-1"
                                color="primary"
                            >
                                {{index+1}}
                            </v-chip>




                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title>
                                    <span class="empty-title">{{item.position_name}}</span>
                                    <span class="number"> เลขที่ตำแหน่ง {{item.position_no}}</span>
                                </v-list-item-title>

                                <v-list-item-subtitle
                                class="pt-1"

                                v-html="`<span class='mr-2'>${item.org_name}</span>`"
                                >
                                </v-list-item-subtitle>



                            </v-list-item-content>
                            <v-list-item-action>
                                <v-row>
                                    <v-col class="tool">
                                        <v-tooltip bottom >
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn
                                                    :disabled="index == 0"
                                                    v-bind="attrs"
                                                    v-on="on"
                                                    class="pa-1"
                                                    color="primary"
                                                    @click="changeUp(index)"
                                                    icon

                                                    >
                                                    <v-icon>mdi-arrow-up-bold-circle-outline</v-icon>
                                                </v-btn>


                                            </template>
                                            <span>ขึ้น</span>
                                        </v-tooltip>
                                    </v-col>
                                    <v-col class="tool">
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn
                                                    :disabled="index == selected.length-1"
                                                    v-bind="attrs"
                                                    v-on="on"
                                                    class="pa-1"
                                                    color="orange"
                                                    @click="changeDown(index)"
                                                    icon

                                                    >
                                                    <v-icon>mdi-arrow-down-bold-circle-outline</v-icon>
                                                </v-btn>

                                            </template>
                                            <span>ลง</span>
                                        </v-tooltip>
                                    </v-col>
                                    <v-col class="tool">
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-icon

                                                    v-bind="attrs"
                                                    v-on="on"
                                                    class="pa-1"
                                                    color="red"
                                                    @click="deleteSelect(index)"
                                                >
                                                    mdi-delete-circle-outline
                                                </v-icon>
                                            </template>
                                            <span>ลบ</span>
                                        </v-tooltip>
                                    </v-col>
                                </v-row>


                            </v-list-item-action>


                    </v-list-item>

                    <v-divider
                        v-if="index < selected.length - 1"
                        :key="index"
                    ></v-divider>
                    </template>
                    </v-virtual-scroll>
                </v-list-item-group>
                </v-list>

      </v-col>
  </v-row>
</template>

<script>
export default {
    data(){
        return {
            empty_postion : [
                {
                    "position_no": 147,
                    "position_name": "นักวิชาการคลัง",
                    "group_name": "กลุ่มงานด้านนโยบายการคลังและเศรษฐกิจการคลังจังหวัด",
                    "org_name": "กองการเงินการคลังภาครัฐ"
                },
                {
                    "position_no": 159,
                    "position_name": "นักวิชาการคลัง",
                    "group_name": "กลุ่มงานเลขานุการคณะกรรมการ",
                    "org_name": "กองการพัสดุภาครัฐ"
                },
                {
                    "position_no": 195,
                    "position_name": "นักวิชาการคลัง",
                    "group_name": "กลุ่มงานผู้ทิ้งงานและการเพิกถอน",
                    "org_name": "กองการพัสดุภาครัฐ"
                },
                {
                    "position_no": 251,
                    "position_name": "นักวิชาการคลัง",
                    "group_name": "กลุ่มงานพัฒนาระบบข้อตกลงคุณธรรม",
                    "org_name": "กองความร่วมมือและความโปร่งใสฯ"
                },
                {
                    "position_no": 263,
                    "position_name": "นักวิชาการคลัง",
                    "group_name": "กลุ่มงานเจรจาการค้าและการมีส่วนร่วมในการบริหารงานภาครัฐ",
                    "org_name": "กองความร่วมมือและความโปร่งใสฯ"
                },
                {
                    "position_no": 608,
                    "position_name": "นักวิชาการคลัง",
                    "group_name": "กลุ่มงานพัฒนาระบบจัดซื้อจัดจ้างและการบริหารพัสดุภาครัฐด้วยอิเล็กทรอนิกส์",
                    "org_name": "กองระบบการจัดซื้อจัดจ้างภาครัฐและราคากลาง"
                },
                {
                    "position_no": 615,
                    "position_name": "นักวิชาการคลัง",
                    "group_name": "กลุ่มงานราคาอ้างอิงและพัฒนาข้อมูลสินค้าเพื่อการจัดซื้อจัดจ้างอิเล็กทรอนิกส์",
                    "org_name": "กองระบบการจัดซื้อจัดจ้างภาครัฐและราคากลาง"
                },
                {
                    "position_no": 806,
                    "position_name": "นักวิชาการคลัง",
                    "group_name": "กลุ่มงานตรวจสอบและกำกับการคลัง",
                    "org_name": "สำนักงานคลังเขต 1"
                },
                {
                    "position_no": 824,
                    "position_name": "นักวิชาการคลัง",
                    "group_name": "กลุ่มงานวิชาการและกำกับการคลัง",
                    "org_name": "สำนักงานคลังเขต 2"
                },
                {
                    "position_no": 879,
                    "position_name": "นักวิชาการคลัง",
                    "group_name": "กลุ่มงานวิชาการและกำกับการคลัง",
                    "org_name": "สำนักงานคลังเขต 6"
                },
                {
                    "position_no": 974,
                    "position_name": "นักวิชาการคลัง",
                    "group_name": "กลุ่มงานกำกับและบริหารการเงินการคลัง",
                    "org_name": "สำนักงานคลังจังหวัดปทุมธานี"
                },
                {
                    "position_no": 1167,
                    "position_name": "นักวิชาการคลัง",
                    "group_name": "กลุ่มงานกำกับและบริหารระบบการคลัง",
                    "org_name": "สำนักงานคลังจังหวัดสมุทรปราการ"
                },
                {
                    "position_no": 1201,
                    "position_name": "นักวิชาการคลัง",
                    "group_name": "กลุ่มงานบริหารการคลังและเศรษฐกิจ",
                    "org_name": "สำนักงานคลังจังหวัดนครราชสีมา"
                },
                {
                    "position_no": 1219,
                    "position_name": "นักวิชาการคลัง",
                    "group_name": "กลุ่มงานบริหารการคลังและเศรษฐกิจ",
                    "org_name": "สำนักงานคลังจังหวัดชัยภูมิ"
                },
                {
                    "position_no": 1227,
                    "position_name": "นักวิชาการคลัง",
                    "group_name": "กลุ่มงานกำกับและบริหารการเงินการคลัง",
                    "org_name": "สำนักงานคลังจังหวัดบุรีรัมย์"
                },
                {
                    "position_no": 1274,
                    "position_name": "นักวิชาการคลัง",
                    "group_name": "กลุ่มงานบริหารการคลังและเศรษฐกิจ",
                    "org_name": "สำนักงานคลังจังหวัดสุรินทร์"
                },
                {
                    "position_no": 1312,
                    "position_name": "นักวิชาการคลัง",
                    "group_name": "กลุ่มงานบริหารการคลังและเศรษฐกิจ",
                    "org_name": "สำนักงานคลังจังหวัดอุบลราชธานี"
                },
                {
                    "position_no": 1341,
                    "position_name": "นักวิชาการคลัง",
                    "group_name": "กลุ่มงานกำกับและบริหารระบบการคลัง",
                    "org_name": "สำนักงานคลังจังหวัดกาฬสินธุ์"
                },
                {
                    "position_no": 1356,
                    "position_name": "นักวิชาการคลัง",
                    "group_name": "กลุ่มงานกำกับและบริหารระบบการคลัง",
                    "org_name": "สำนักงานคลังจังหวัดขอนแก่น"
                },
                {
                    "position_no": 1373,
                    "position_name": "นักวิชาการคลัง",
                    "group_name": "กลุ่มงานกำกับและบริหารระบบการคลัง",
                    "org_name": "สำนักงานคลังจังหวัดนครพนม"
                },
                {
                    "position_no": 1396,
                    "position_name": "นักวิชาการคลัง",
                    "group_name": "กลุ่มงานกำกับและบริหารการเงินการคลัง",
                    "org_name": "สำนักงานคลังจังหวัดมุกดาหาร"
                },
                {
                    "position_no": 1430,
                    "position_name": "นักวิชาการคลัง",
                    "group_name": "กลุ่มงานกำกับและบริหารระบบการคลัง",
                    "org_name": "สำนักงานคลังจังหวัดเลย"
                },
                {
                    "position_no": 1435,
                    "position_name": "นักวิชาการคลัง",
                    "group_name": "กลุ่มงานบริหารการคลังและเศรษฐกิจ",
                    "org_name": "สำนักงานคลังจังหวัดเลย"
                },
                {
                    "position_no": 1471,
                    "position_name": "นักวิชาการคลัง",
                    "group_name": "กลุ่มงานกำกับและบริหารการเงินการคลัง",
                    "org_name": "สำนักงานคลังจังหวัดหนองบัวลำภู"
                },
                {
                    "position_no": 1485,
                    "position_name": "นักวิชาการคลัง",
                    "group_name": "กลุ่มงานกำกับและบริหารการเงินการคลัง",
                    "org_name": "สำนักงานคลังจังหวัดบึงกาฬ"
                },
                {
                    "position_no": 1490,
                    "position_name": "นักวิชาการคลัง",
                    "group_name": "กลุ่มงานกำกับและบริหารระบบการคลัง",
                    "org_name": "สำนักงานคลังจังหวัดบึงกาฬ"
                },
                {
                    "position_no": 1532,
                    "position_name": "นักวิชาการคลัง",
                    "group_name": "กลุ่มงานบริหารการคลังและเศรษฐกิจ",
                    "org_name": "สำนักงานคลังจังหวัดเชียงราย"
                },
                {
                    "position_no": 1538,
                    "position_name": "นักวิชาการคลัง",
                    "group_name": "กลุ่มงานกำกับและบริหารการเงินการคลัง",
                    "org_name": "สำนักงานคลังจังหวัดน่าน"
                },
                {
                    "position_no": 1543,
                    "position_name": "นักวิชาการคลัง",
                    "group_name": "กลุ่มงานกำกับและบริหารระบบการคลัง",
                    "org_name": "สำนักงานคลังจังหวัดน่าน"
                },
                {
                    "position_no": 1570,
                    "position_name": "นักวิชาการคลัง",
                    "group_name": "กลุ่มงานกำกับและบริหารการเงินการคลัง",
                    "org_name": "สำนักงานคลังจังหวัดแพร่"
                },
                {
                    "position_no": 1584,
                    "position_name": "นักวิชาการคลัง",
                    "group_name": "กลุ่มงานกำกับและบริหารการเงินการคลัง",
                    "org_name": "สำนักงานคลังจังหวัดแม่ฮ่องสอน"
                },
                {
                    "position_no": 1589,
                    "position_name": "นักวิชาการคลัง",
                    "group_name": "กลุ่มงานกำกับและบริหารระบบการคลัง",
                    "org_name": "สำนักงานคลังจังหวัดแม่ฮ่องสอน"
                },
                {
                    "position_no": 1663,
                    "position_name": "นักวิชาการคลัง",
                    "group_name": "กลุ่มงานกำกับและบริหารการเงินการคลัง",
                    "org_name": "สำนักงานคลังจังหวัดตาก"
                },
                {
                    "position_no": 1668,
                    "position_name": "นักวิชาการคลัง",
                    "group_name": "กลุ่มงานกำกับและบริหารระบบการคลัง",
                    "org_name": "สำนักงานคลังจังหวัดตาก"
                },
                {
                    "position_no": 1706,
                    "position_name": "นักวิชาการคลัง",
                    "group_name": "กลุ่มงานบริหารการคลังและเศรษฐกิจ",
                    "org_name": "สำนักงานคลังจังหวัดพิจิตร"
                },
                {
                    "position_no": 1712,
                    "position_name": "นักวิชาการคลัง",
                    "group_name": "กลุ่มงานกำกับและบริหารการเงินการคลัง",
                    "org_name": "สำนักงานคลังจังหวัดเพชรบูรณ์"
                },
                {
                    "position_no": 1761,
                    "position_name": "นักวิชาการคลัง",
                    "group_name": "กลุ่มงานกำกับและบริหารระบบการคลัง",
                    "org_name": "สำนักงานคลังจังหวัดอุตรดิตถ์"
                },
                {
                    "position_no": 1793,
                    "position_name": "นักวิชาการคลัง",
                    "group_name": "กลุ่มงานกำกับและบริหารระบบการคลัง",
                    "org_name": "สำนักงานคลังจังหวัดกาญจนบุรี"
                },
                {
                    "position_no": 1804,
                    "position_name": "นักวิชาการคลัง",
                    "group_name": "กลุ่มงานกำกับและบริหารการเงินการคลัง",
                    "org_name": "สำนักงานคลังจังหวัดประจวบคีรีขันธ์"
                },
                {
                    "position_no": 1872,
                    "position_name": "นักวิชาการคลัง",
                    "group_name": "กลุ่มงานกำกับและบริหารระบบการคลัง",
                    "org_name": "สำนักงานคลังจังหวัดสมุทรสาคร"
                },
                {
                    "position_no": 1888,
                    "position_name": "นักวิชาการคลัง",
                    "group_name": "กลุ่มงานกำกับและบริหารระบบการคลัง",
                    "org_name": "สำนักงานคลังจังหวัดสุพรรณบุรี"
                },
                {
                    "position_no": 1948,
                    "position_name": "นักวิชาการคลัง",
                    "group_name": "กลุ่มงานกำกับและบริหารการเงินการคลัง",
                    "org_name": "สำนักงานคลังจังหวัดชุมพร"
                },
                {
                    "position_no": 1963,
                    "position_name": "นักวิชาการคลัง",
                    "group_name": "กลุ่มงานกำกับและบริหารการเงินการคลัง",
                    "org_name": "สำนักงานคลังจังหวัดพังงา"
                },
                {
                    "position_no": 1979,
                    "position_name": "นักวิชาการคลัง",
                    "group_name": "กลุ่มงานกำกับและบริหารการเงินการคลัง",
                    "org_name": "สำนักงานคลังจังหวัดภูเก็ต"
                },
                {
                    "position_no": 2008,
                    "position_name": "นักวิชาการคลัง",
                    "group_name": "กลุ่มงานกำกับและบริหารการเงินการคลัง",
                    "org_name": "สำนักงานคลังจังหวัดสงขลา"
                },
                {
                    "position_no": 2013,
                    "position_name": "นักวิชาการคลัง",
                    "group_name": "กลุ่มงานกำกับและบริหารระบบการคลัง",
                    "org_name": "สำนักงานคลังจังหวัดสงขลา"
                },
                {
                    "position_no": 2020,
                    "position_name": "นักวิชาการคลัง",
                    "group_name": "กลุ่มงานบริหารการคลังและเศรษฐกิจ",
                    "org_name": "สำนักงานคลังจังหวัดสงขลา"
                },
                {
                    "position_no": 2041,
                    "position_name": "นักวิชาการคลัง",
                    "group_name": "กลุ่มงานกำกับและบริหารการเงินการคลัง",
                    "org_name": "สำนักงานคลังจังหวัดพัทลุง"
                },
                {
                    "position_no": 2046,
                    "position_name": "นักวิชาการคลัง",
                    "group_name": "กลุ่มงานกำกับและบริหารระบบการคลัง",
                    "org_name": "สำนักงานคลังจังหวัดพัทลุง"
                },
                {
                    "position_no": 2061,
                    "position_name": "นักวิชาการคลัง",
                    "group_name": "กลุ่มงานกำกับและบริหารระบบการคลัง",
                    "org_name": "สำนักงานคลังจังหวัดนราธิวาส"
                },
                {
                    "position_no": 2107,
                    "position_name": "นักวิชาการคลัง",
                    "group_name": "กลุ่มงานกำกับและบริหารระบบการคลัง",
                    "org_name": "สำนักงานคลังจังหวัดสตูล"
                },
                {
                    "position_no": 649,
                    "position_name": "นิติกร",
                    "group_name": "กลุ่มงานละเมิดและแพ่ง 3",
                    "org_name": "กองละเมิดและแพ่ง"
                },
                {
                    "position_no": 669,
                    "position_name": "นิติกร",
                    "group_name": "กลุ่มงานละเมิดและแพ่ง 6",
                    "org_name": "กองละเมิดและแพ่ง"
                },
                {
                    "position_no": 203,
                    "position_name": "นักบัญชี",
                    "group_name": "กลุ่มงานยุทธศาสตร์และสารสนเทศเงินนอกงบประมาณ",
                    "org_name": "กองกำกับและพัฒนาระบบเงินนอกงบประมาณ"
                },
                {
                    "position_no": 312,
                    "position_name": "นักบัญชี",
                    "group_name": "กลุ่มงานบริหารการตรวจสอบ",
                    "org_name": "กองตรวจสอบภาครัฐ"
                },
                {
                    "position_no": 505,
                    "position_name": "นักบัญชี",
                    "group_name": "กลุ่มงานมาตรฐานและนโยบายการบัญชีภาครัฐ",
                    "org_name": "กองบัญชีภาครัฐ"
                },
                {
                    "position_no": 39,
                    "position_name": "นักวิชาการเงินและบัญชี",
                    "group_name": "กลุ่มงานบัญชี",
                    "org_name": "สำนักงานเลขานุการกรม"
                },
                {
                    "position_no": 709,
                    "position_name": "นักวิชาการคอมพิวเตอร์",
                    "group_name": "กลุ่มงานพัฒนาระบบงาน 1",
                    "org_name": "ศูนย์เทคโนโลยีสารสนเทศและการสื่อสาร"
                },
                {
                    "position_no": 715,
                    "position_name": "นักวิชาการคอมพิวเตอร์",
                    "group_name": "กลุ่มงานพัฒนาระบบงาน 2",
                    "org_name": "ศูนย์เทคโนโลยีสารสนเทศและการสื่อสาร"
                },
                {
                    "position_no": 727,
                    "position_name": "นักวิชาการคอมพิวเตอร์",
                    "group_name": "กลุ่มงานพัฒนาระบบงาน 4",
                    "org_name": "ศูนย์เทคโนโลยีสารสนเทศและการสื่อสาร"
                },
                {
                    "position_no": 759,
                    "position_name": "นักทรัพยากรบุคคล",
                    "group_name": "กลุ่มงานมาตรฐานการพัฒนาบุคลากร",
                    "org_name": "สถาบันพัฒนาบุคลากรด้านการคลังและบัญชีภาครัฐ"
                },
                {
                    "position_no": 769,
                    "position_name": "นักทรัพยากรบุคคล",
                    "group_name": "กลุ่มงานบริหารหลักสูตรภาครัฐ",
                    "org_name": "สถาบันพัฒนาบุคลากรด้านการคลังและบัญชีภาครัฐ"
                }
            ],
            position_list: [
                {text: 'นักวิชาการคลัง', value: 1},
                {text: 'นักทรัพยากรบุคคล', value: 2},
                {text: 'นักบัญชี', value: 3},
                {text: 'นักวิชาการคอมพิวเตอร์', value: 4},
                {text: 'นักวิชาการเงินและบัญชี', value: 5},
                {text: 'นิติกร', value: 6},
            ],
            selected: [],
            select_position: null ,
            positions: [],
            empty: [],
            tree:[],
            children_list: [],
            showTree: false,
            search: ''

        }
    },
    computed: {
        // position_list
    },
    mounted(){
        this.fecthData();
    },
    methods:{
        async fecthData(){
            let arr = await this.empty_postion.map((x)=>{
                return x.position_name
            });
            this.tree = await this.createTree();
            this.showTree = true;
            this.$forceUpdate();
            // this.positions = await this.removeDuplicateStrings(arr);
            // this.empty = await this.groupByKey(this.empty_postion,"position_name");
        },
        removeDuplicateStrings(inputArray){
            return [...new Set(inputArray)]
        },
        groupByKey(array, key) {
            return array
                .reduce((hash, obj) => {
                if(obj[key] === undefined) return hash;
                return Object.assign(hash, { [obj[key]]:( hash[obj[key]] || [] ).concat(obj)})
            }, {})
        },
        async createTree(){
            let tree = this.position_list;
            for (let i=0;i<tree.length;i++){
                let children = await this.empty_postion.filter(x=>x.position_name == tree[i].text)
                Object.assign(tree[i],{"children": children})
            }
            return tree;
        },
        selectPosition(index){
            console.log('click');
            this.select_position = this.tree[index].text;
            this.children_list = this.tree[index].children
        },
        checkIsSelected(no){
            return this.selected.findIndex(x=>x.position_no == no);
        },
        selectEmptyPosition(no){

            let item = this.empty_postion.find(x=>x.position_no == no);
            if (item){
                let index = this.checkIsSelected(no);
                console.log('index ' + index);
                if (index < 0){
                    this.selected.push(item);
                    console.log('position :' + item.position_name);
                }else{
                    this.selected.splice(index,1);
                }

            }
        },
        deleteSelect(index){
            this.selected.splice(index,1);
        },
        async changeUp(index){
            console.log('up' + index)
            let item = await this.selected[index-1];
            console.log('before index-1 :' + this.selected[index-1].position_no)
            this.selected.splice(index-1,1,this.selected[index])
            console.log('after index-1 :' + this.selected[index-1].position_no)
            this.selected.splice(index,1,item)

        },
        async changeDown(index){

            let item = await this.selected[index+1];

            this.selected.splice(index+1,1,this.selected[index])

            this.selected.splice(index,1,item)

        }
    }
}
</script>

<style scoped>
.col-3, .col-4, .col-5{
    padding-right: 0px!important;
}
.col-5{
    padding-left: 0px!important;
}
.position{
    width: 100%;
}
.empty_position{
    width: 100%;
}
hr{
    margin-top: 2px!important;
    margin-bottom: 2px!important;
}
.empty-title{
    font-size: 0.9rem;
    font-weight: bold;
    color: #308DC2;
}
.number{
    font-size: 0.8rem;
    color: #084d77;
}
.subtitle2{
    color: brown!important;
    font-size: 0.8rem;
}
.subtitle{
    color: rgb(56, 56, 56)!important;
    font-size: 0.8rem;
}
.order{
    margin-right: 2px!important;
    font-size: 1rem;
}
.tool{
    padding: 2px!important;
}

</style>
